// socket-module.js
const { Server } = require("socket.io");

module.exports = {
  async register({ strapi }) {
    // Realiza configuraciones adicionales si es necesario.
  },

  async bootstrap({ strapi }) {
    const httpServer = strapi.server.httpServer;
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    const users = {}; // Agregamos la declaración de la variable users aquí

    io.on("connection", (socket) => {
      try {
        // Manejo de eventos
        handleJoinRoom(socket);
        handleChat(socket);
        handleDisconnect(socket);
        handleGetUsers(socket);
      } catch (error) {
        console.error("Error al conectar con el socket:", error);
      }
    });

    async function handleJoinRoom(socket) {
      socket.on("joinRoom", async ({ username, roomname }) => {
        const roomExists = checkRoom(roomname);

        if ((await roomExists) == true) {
          try {
            console.log("La sala existe");

            // Crea un usuario
            const user = userJoin(socket.id, username, roomname);
            socket.join(roomname);

            // Envia la lista de usuarios y la sala
            const roomUsers = getRoomUsers(roomname);
            io.to(roomname).emit("roomUsers", {
              room: roomname,
              users: roomUsers,
            });

            // Obtiene los mensajes de la sala
            await getMessages(io, user);
          } catch (error) {
            console.error("Error al obtener los mensajes:", error);
          }
        } else {
          console.log("La sala no existe");
          socket.emit("message", {
            userId: socket.id,
            username: "Admin",
            message: `La sala ${roomname} no existe`,
          });
        }
      });
    }

    async function handleChat(socket) {
      socket.on("chat", async (message) => {
        console.log(message);
        const user = getCurrentUser(socket.id);
        console.log(user);
        if (user && user.room) {
          console.log("Subiendo mensaje");
          try {
            // Guarda el mensaje en Strapi (base de datos sqlite)
            fetch("http://127.0.0.1:1337/api/messages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  message: message,
                  room: user.room,
                  user: user.username,
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                sendMessage(io, user, message);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } catch (error) {
            console.error("Error al guardar el mensaje en Strapi:", error);
          }
        }
      });
    }

    function handleDisconnect(socket) {
      socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user && user.room) {
          io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            message: `${user.username} ha abandonado el chat`,
          });
        }
      });
    }

    function handleGetUsers(socket) {
      socket.on("getUsers", () => {
        const user = getCurrentUser(socket.id);

        if (user) {
          const roomUsers = getRoomUsers(user.room);
          io.to(user.room).emit("roomUsers", { users: roomUsers });
        }
      });
    }

    function userJoin(id, username, room) {
      const user = { id, username, room };
      users[id] = user;
      return user;
    }
    async function checkRoom(roomname) {
      const entry = await strapi.query("api::message.message").findOne({
        room: roomname,
      });

      if (entry.room == roomname) return true;
    }

    function getCurrentUser(id) {
      return users[id];
    }
    async function getMessages(io, user) {
      const messageData = await strapi.query("api::message.message").findMany({
        room: user.room,
      });
      io.to(user.room).emit("getChat", {
        messageData,
      });
    }

    function sendMessage(io, user, message) {
      io.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        message: message,
      });
    }
    function userLeave(id) {
      if (users[id]) {
        const user = users[id];
        delete users[id];
        return user;
      }
    }

    function getRoomUsers(room) {
      return Object.values(users).filter((user) => user.room === room);
    }
  },
};
