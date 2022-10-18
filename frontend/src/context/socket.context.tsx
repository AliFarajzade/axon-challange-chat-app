import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import EVENTS from '../utils/events.util'

// Initialize a socket connection:
const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL as string)

interface ISocketContextType {
    socket: Socket<any, any> | null
    name: string
    setName: Dispatch<SetStateAction<string>>
    roomId: string
    rooms: Record<string, { name: string }>
    messages: { message: string; name: string; time: string }[]
    setMessages: Dispatch<SetStateAction<any[]>>
}

const SocketContext = createContext<ISocketContextType>({
    socket: null,
    name: '',
    setName: () => {},
    roomId: '',
    rooms: {},
    messages: [],
    setMessages: () => {},
})

// Easier hook to import instead of importing useContext and context its self
export const useSocket = () => useContext(SocketContext)

interface IProps {
    children: React.ReactNode | React.ReactNode[]
}

const SocketProvider = ({ children }: IProps) => {
    const [socket, setSocket] = useState<Socket<any, any> | null>(null)
    const [name, setName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [rooms, setRooms] = useState<Record<string, { name: string }>>({})
    const [messages, setMessages] = useState<any[]>([])

    // Handling socket events
    if (socket) {
        // Get the rooms from the server after each update on server
        socket.on(EVENTS.ROOMS, (value: Record<string, { name: string }>) => setRooms(value))

        // Get the id of the newly created room
        socket.on(EVENTS.JOINED_ROOMS, (value: string) => {
            setRoomId(value)

            setMessages([])
        })

        // Get room messages
        socket.on(
            EVENTS.ROOM_MESSAGE,
            ({ message, name, time }: { message: string; name: string; time: string }) => {
                if (!document.hasFocus()) {
                    document.title = 'New Message...'
                }

                setMessages([...messages, { name, message, time }])
            }
        )
    }

    // Set the socket object to context after initialization
    useEffect(() => {
        if (socketIo) setSocket(socketIo)
        return () => {
            setSocket(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketIo])

    // Notify user when a new message is comming in
    useEffect(() => {
        window.onfocus = () => {
            document.title = 'Chat app'
        }
    }, [])

    return (
        <SocketContext.Provider
            value={{ socket, name, setName, roomId, rooms, messages, setMessages }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
