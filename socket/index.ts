import { Server as NuxtServer } from 'node:http'
import {  Server } from "socket.io";
import { socketHandler } from './handler';

export function startSocketServer (nuxtServer: NuxtServer) {
  const io = new Server(nuxtServer, {
    cors: {
      origin: ["*"]
    }
  })
  socketHandler(io)
};