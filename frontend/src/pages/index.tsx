import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import Messages from '../components/messages.componenet'
import Rooms from '../components/rooms.component'
import { useSocket } from '../context/socket.context'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    const { setName, name } = useSocket()
    const nameRef = useRef<HTMLInputElement | null>(null)

    const handleSetUserName = () => {
        const value = nameRef.current?.value

        if (!value) return

        setName(value)

        localStorage.setItem('name', value)
    }

    // Checking for exsiting user in localstorage:
    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.value = localStorage.getItem('name') ?? ''
        }
    }, [])

    return (
        <div>
            {!name ? (
                <div className={styles.usernameWrapper}>
                    <div className={styles.usernameInner}>
                        <input type="text" placeholder="Name" ref={nameRef} />
                        <button className="cta" onClick={handleSetUserName}>
                            START
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <Messages />
                    <Rooms />
                </div>
            )}
        </div>
    )
}

export default Home
