import { io, Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '~/src/types/socketMessages'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(runtimeConfig.public.socketURL, {
        autoConnect: false,
        multiplex: false,
        transports: ['websocket']
    })

    return {
        provide: {
            io: socket
        }
    }
})