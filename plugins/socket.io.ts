import { io, Socket } from 'socket.io-client'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import type { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'

export default defineNuxtPlugin(()=>{
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('localhost:3001', {
        autoConnect: false,
        multiplex: false,
    })

    return {
        provide: {
            io: socket
        }
    }
})