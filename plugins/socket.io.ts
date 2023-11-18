import io from 'socket.io-client'

export default defineNuxtPlugin(()=>{
    const socket = io('localhost:3001', {
        autoConnect: false
    })

    return {
        provide: {
            io: socket
        }
    }
})