import { Server, Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'

const EVENTS = {
    CONNECTION: 'connection',
    CREATE_ROOM: 'CREATE_ROOM',
    ROOMS: 'ROOMS',
    JOINED_ROOMS: 'JOIEND_ROOMS',
    SEND_NEW_MESSAGE: 'SEND_NEW_MESSAGE',
    ROOM_MESSAGE: 'ROOM_MESSAGE',
    JOIN_ROOM: 'JOIN_ROOM',
}

const rooms: Record<string, { name: string }> = {}

const socket = (io: Server) => {
    console.log('Socket is running...')

    io.on(EVENTS.CONNECTION, (socket: Socket) => {
        console.log(`User connected: ${socket.id}`)

        // Give prev rooms to the user on join
        socket.emit(EVENTS.ROOMS, rooms)

        // Create a new room
        socket.on(EVENTS.CREATE_ROOM, ({ roomName }) => {
            console.log(roomName)

            // Create room id
            const roomId = uuid()

            // Add a new room to the rooms object
            rooms[roomId] = { name: roomName }

            // Socket.join(roomid)
            socket.join(roomId)

            // Broadcast a new event saying that there is a new room
            socket.broadcast.emit(EVENTS.ROOMS, rooms)

            // Emit back to the room creator with all the rooms
            socket.emit(EVENTS.ROOMS, rooms)

            // Emit back to the room creator saying they have joind the room
            socket.emit(EVENTS.JOINED_ROOMS, roomId)
        })

        // Sending new message
        socket.on(
            EVENTS.SEND_NEW_MESSAGE,
            ({ roomId, message, name }: { roomId: string; message: string; name: string }) => {
                const date = new Date()
                socket.to(roomId).emit(EVENTS.ROOM_MESSAGE, {
                    message,
                    name,
                    time: `${date.getHours()}:${date.getMinutes()}`,
                })
            }
        )

        // User joining the room
        socket.on(EVENTS.JOIN_ROOM, (roomId: string) => {
            socket.join(roomId)

            // Emit back to the room creator saying they have joind the room
            socket.emit(EVENTS.JOINED_ROOMS, roomId)
        })
    })
}

export default socket
