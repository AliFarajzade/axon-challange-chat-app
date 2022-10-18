import type { AppProps } from 'next/app'
import SocketProvider from '../context/socket.context'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp
