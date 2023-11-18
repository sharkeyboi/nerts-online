import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {v4} from 'uuid'
const MAX_USERS = 2
type Room = {
    roomId: string,
    users: string[]
}

let rooms:Room[] = []
export default defineNitroPlugin((nitroApp) => {
    const socketServer = new Server(3001, {
        serveClient: false,
        cors: {
            origin: '*'
        }
    })
    socketServer.on('connection', (socket) => {
        const currRoom = joinRoom(socket)
        console.log(socket.handshake.auth.username)
        socketServer.to(currRoom.roomId).emit('message', `${socket.handshake.auth.username} has entered room: ${currRoom.roomId}`)
        socket.on("message", async (message)=>{
            socketServer.to(currRoom.roomId).emit('message', "Received message: " + message)
         })
        
         socket.on("disconnect", (reason) => {
            currRoom.users.splice(currRoom.users.indexOf(socket.handshake.auth.username),1)
         })
     })
    
     
})

function joinRoom(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): Room {
    if (rooms.length == 0 || rooms[rooms.length - 1].users.length >= MAX_USERS) {
        const newRoom = {
            roomId: v4(),
            users: [socket.handshake.auth.username]
        }
        rooms.push(newRoom)
        socket.join(newRoom.roomId)
        return newRoom
    }
    else {
        const currRoom = rooms[rooms.length - 1]
        currRoom.users.push(socket.handshake.auth.username)
        socket.join(currRoom.roomId)
        return currRoom
    }
}
