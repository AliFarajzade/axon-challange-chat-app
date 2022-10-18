import { useRef } from 'react'
import { useSocket } from '../context/socket.context'
import styles from '../styles/Room.module.scss'
import EVENTS from '../utils/events.util'

const Rooms: React.FC = () => {
    const { socket, roomId, rooms } = useSocket()
    const newRoomRef = useRef<HTMLInputElement | null>(null)

    const handleCreateRoom = () => {
        // Get room name
        const roomName = newRoomRef.current?.value ?? ''

        if (!roomName.trim()) return

        // Emitting the create room event and passing room name to server
        socket?.emit(EVENTS.CREATE_ROOM, { roomName })

        // Set input room name back to empty string
        if (newRoomRef.current?.value) newRoomRef.current.value = ''
    }

    const handleJoinRoom = (key: string) => {
        // Check if they are joining the room that
        // they are already in
        if (key === roomId) return

        socket?.emit(EVENTS.JOIN_ROOM, key)
    }

    return (
        <nav className={styles.wrapper}>
            <div className={styles.createRoomWrapper}>
                <input type="text" placeholder="Room name" ref={newRoomRef} />
                <button className="cta" onClick={handleCreateRoom}>
                    Create a Room
                </button>
            </div>

            <ul className={styles.roomList}>
                <h4>Click to enter a room</h4>
                {Object.keys(rooms).map(key => (
                    <div key={key}>
                        <button
                            disabled={roomId === key}
                            title={`Join room ${rooms[key].name}`}
                            onClick={() => handleJoinRoom(key)}
                        >
                            {rooms[key].name}
                        </button>
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default Rooms
