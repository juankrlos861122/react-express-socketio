import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("messageBackend", (body) => {
    socket.broadcast.emit("messageFrontend", {
      body,
      from: socket.id.slice(5),
    });
  });
});

server.listen(3000, () => {
  console.log("server listening on port", 3000);
});
