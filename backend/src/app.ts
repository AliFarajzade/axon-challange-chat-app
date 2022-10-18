import dotnev from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import { Server } from 'socket.io'
import socket from './socket'

dotnev.config({
    path: '../.env',
})

const port = process.env.PORT ?? 7777
const host = process.env.HOST ?? 'localhost'
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000'

const app = express()

app.use(morgan('dev'))

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
})

app.get('/', (_, res) => res.status(200).send('Server is running...'))

httpServer.listen(+port, host, () => {
    console.log(`🚀Server is running on port ${port}...`)

    socket(io)
})
