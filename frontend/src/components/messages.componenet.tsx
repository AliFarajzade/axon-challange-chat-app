import { useEffect, useRef } from 'react'
import { useSocket } from '../context/socket.context'
import styles from '../styles/Messages.module.scss'
import EVENTS from '../utils/events.util'

const Messages: React.FC = () => {
    const { socket, messages, roomId, name, setMessages } = useSocket()
    const newMessageRef = useRef<HTMLTextAreaElement | null>(null)
    const messageEndRef = useRef<HTMLDivElement | null>(null)

    const handleSendMessage = () => {
        const message = newMessageRef.current?.value

        if (!message?.trim()) return

        // Send message
        socket?.emit(EVENTS.SEND_NEW_MESSAGE, { roomId, message, name })

        // Display the message that just sent
        const date = new Date()

        setMessages([
            ...messages,
            {
                name: 'You',
                message,
                time: `${date.getHours()}:${date.getMinutes()}`,
            },
        ])
    }

    // Scroll down when new message came
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    if (!roomId) return null

    return (
        <div className={styles.wrapper}>
            <div className={styles.messageList}>
                {messages.map(({ message, name, time }, idx) => (
                    <div key={idx} className={styles.message}>
                        <div key={idx} className={styles.messageInner}>
                            <span>
                                {name} - {time}
                            </span>
                            <span className={styles.messageBody}> {message}</span>
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>

            <div className={styles.messageBox}>
                <textarea
                    placeholder="Write a message..."
                    name="message"
                    rows={1}
                    ref={newMessageRef}
                ></textarea>

                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Messages
