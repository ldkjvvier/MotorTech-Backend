// socket-module.js
const { Server } = require("socket.io");
const { entries } = require("../config/middlewares");

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

    const users = {};

    io.on("connection", (socket) => {
      try {
        // Manejo de eventos
        handleJoinRoom(socket);
        handleChat(socket);
        handleDisconnect(socket);
        handleGetUsers(socket);
        notification(socket);
      } catch (error) {
        console.error("Error al conectar con el socket:", error);
      }
    });

    function handleJoinRoom(socket) {
      socket.on("joinRoom", async ({ name, roomname }) => {
        const roomExists = await checkRoom(roomname);

        if (roomExists) {
          try {
            console.log("La sala existe");

            const user = userJoin(socket.id, name, roomname);
            socket.join(roomname);
            const roomUsers = getRoomUsers(roomname);
            io.to(roomname).emit("roomUsers", {
              room: roomname,
              users: roomUsers,
            });

            await getMessages(io, user);
          } catch (error) {
            console.error("Error al obtener los mensajes:", error);
          }
        } else {
          console.log("La sala no existe");
        }
      });
    }

    function handleChat(socket) {
      socket.on("chat", async (message, email) => {
        const user = getCurrentUser(socket.id);

        if (user && user.room) {
          try {
            await saveMessageToStrapi(io, user, message, email);
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
            name: user.name,
            message: `${user.name} ha abandonado el chat`,
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

    function userJoin(id, name, room) {
      const user = { id, name, room };
      users[id] = user;
      return user;
    }

    async function checkRoom(roomname) {
      const entry = await strapi.query("api::message.message").findOne({
        room: roomname,
      });
      if (entry.room === roomname) return true;
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

    async function saveMessageToStrapi(io, user, message, email) {
      try {
        const response = await fetch("http://127.0.0.1:1337/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              message: message,
              room: user.room,
              user: user.name,
              email: email,
            },
          }),
        });
        if (response.status === 200) {
          sendMessage(io, user, message);
          console.log("Mensaje guardado correctamente");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    function sendMessage(io, user, message) {
      io.to(user.room).emit("message", {
        userId: user.id,
        name: user.name,
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


    /* SISTEMA DE NOTIFICACIONES */

    const notifications = {};

    
    async function notification(socket) {
      socket.on("receiveNotification", async (userId) => {
        // Obtener id del usuario
        const id = getCurrentUser(socket.id);
        // Obtener notificaciones del usuario
        const notification = await getNotification(userId);
        // Enviar notificaciones al usuario
        io.to(id).emit("getNotification", {
          notification,
        });
      });
    }

    async function getNotification(userId) {
      const entry = await strapi
        .query("api::notification.notification")
        .findMany({
          receiver: userId,
        });
      console.log(entry);
      return entry;
    }
    
  },




};
