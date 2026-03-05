import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { getStats } from "./system.js"
import { getExecutions } from "./n8n.js"
import { getRenderStatus } from "./render.js"

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
cors:{origin:"*"}
})

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
res.send("MASS Monitoring Server Running")
})

io.on("connection",(socket)=>{

console.log("Dashboard connected")

setInterval(async()=>{

try{

const stats = await getStats()
const executions = await getExecutions()
const render = await getRenderStatus()

socket.emit("stats",stats)
socket.emit("executions",executions)
socket.emit("render",render)

}catch(err){

console.log("Monitor error",err.message)

}

},5000)

})

server.listen(PORT,()=>{
console.log("Server running on port",PORT)
})
