import { Server } from "http";
import { Server as SocketIO } from "socket.io";

import logger from "../utils/logger.js";

let _io: SocketIO;

export const SocketManager = {
  get io(): SocketIO {
    if (!_io) {
      throw new Error(
        "Socket.io not initialized. Call SocketManager.init(server) first."
      );
    }
    return _io;
  },

  init: (server: Server) => {
    if (_io) return;

    _io = new SocketIO(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    _io.on("connection", (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      socket.on("join_poll", async (data: { pollId: string }) => {
        const room = `poll:${data.pollId}`;
        await socket.join(room);
        socket.emit("joined_poll", { pollId: data.pollId });
        logger.info(`${socket.id} joined ${room}`);
      });

      socket.on("leave_poll", (data: { pollId: string }) => {
        const room = `poll:${data.pollId}`;
        socket.leave(room);
        socket.emit("left_poll", { pollId: data.pollId });
        logger.info(`${socket.id} left ${room}`);
      });

      socket.on("disconnect", (reason) => {
        logger.info(`Socket disconnected: ${socket.id} (${reason})`);
      });
    });
  },
} as const;
