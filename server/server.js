import express from "express"
import cors from "cors"
import http from "http"
import {Server} from "socket.io"

import {getStats} from "./system.js"
import {getExecutions} from "./n8n.js"
import {getContainers} from "./docker.js"
import {getRenderStatus} from "./render.js"

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{cors:{origin:"*"}})

io.on("connection",(socket)=>{

console.log("Dashboard connected")

setInterval(async()=>{

const stats = await getStats()

const executions = await getExecutions()

const containers = await getContainers()

const render = await getRenderStatus()

socket.emit("stats",stats)

socket.emit("executions",executions)

socket.emit("containers",containers)

socket.emit("render",render)

},4000)

})

server.listen(3000,()=>{

console.log("MASS Enterprise Monitor Running")

})