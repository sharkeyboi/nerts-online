import { io, Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'

export default defineNuxtPlugin(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env["SOCKET_URL"], {
        autoConnect: false,
        multiplex: false,
    })

    return {
        provide: {
            io: socket
        }
    }
})