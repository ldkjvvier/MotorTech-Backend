"use strict";

/**
 * chat controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::chat.chat");

const _ = require("lodash");

module.exports = {
  async send(ctx) {
    const { mensaje } = ctx.request.body;

    if (!mensaje) {
      return ctx.badRequest("El mensaje no puede estar vacío.");
    }

    // Aquí puedes guardar el mensaje en la base de datos si es necesario

    // Emitir el mensaje a todos los clientes conectados
    ctx.io.emit("nuevo-mensaje", mensaje);

    return ctx.send("Mensaje enviado");
  },

  async find(ctx) {
    // Lógica para buscar y devolver chats o mensajes
    const { id } = ctx.params;
    const { _q } = ctx.query;

    if (id) {
      // Buscar un chat por ID
      const chat = await strapi.services.chat.findOne({ id });

      if (!chat) {
        return ctx.notFound("Chat no encontrado");
      }

      return chat;
    } else {
      // Agregar lógica para buscar y devolver todos los chats o mensajes
      // Por ejemplo:
      const chats = await strapi.services.chat.find({ _q });
      return chats;
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    // Lógica para buscar y devolver un chat o mensaje específico según su id
    const chat = await strapi.services.chat.findOne({ id });

    if (!chat) {
      return ctx.notFound("Chat no encontrado");
    }

    return chat;
  },

  async create(ctx) {
    // Lógica para crear un nuevo chat o mensaje
    const { mensaje } = ctx.request.body;

    if (!mensaje) {
      return ctx.badRequest("El mensaje no puede estar vacío.");
    }

    // Aquí puedes guardar el mensaje en la base de datos
    const nuevoChat = await strapi.services.chat.create({ mensaje });

    // Emitir el mensaje a todos los clientes conectados
    ctx.io.emit("nuevo-mensaje", nuevoChat);

    return ctx.send(nuevoChat);
  },

  async update(ctx) {
    // Lógica para actualizar un chat o mensaje existente
    const { id } = ctx.params;
    const { mensaje } = ctx.request.body;

    if (!mensaje) {
      return ctx.badRequest("El mensaje no puede estar vacío.");
    }

    // Aquí puedes actualizar el mensaje en la base de datos
    const chatActualizado = await strapi.services.chat.update(
      { id },
      { mensaje }
    );

    // Emitir el mensaje actualizado a todos los clientes conectados si es necesario
    ctx.io.emit("mensaje-actualizado", chatActualizado);

    return ctx.send(chatActualizado);
  },

  async delete(ctx) {
    // Lógica para eliminar un chat o mensaje existente
    const { id } = ctx.params;

    // Aquí puedes eliminar el mensaje de la base de datos
    const chatEliminado = await strapi.services.chat.delete({ id });

    // Emitir un evento de mensaje eliminado a todos los clientes conectados si es necesario
    ctx.io.emit("mensaje-eliminado", chatEliminado);

    return ctx.send(chatEliminado);
  },
};
