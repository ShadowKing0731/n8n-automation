import express from "express"
import cors from "cors"
import axios from "axios"
import http from "http"
import { Server } from "socket.io"
import si from "systeminformation"

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{cors:{origin:"*"}})

const N8N_URL = "https://n8n-latest-z1mo.onrender.com"

async function getServerStats(){

 const cpu = await si.currentLoad()
 const mem = await si.mem()

 return {
  cpu:cpu.currentLoad.toFixed(2),
  ram:((mem.used/mem.total)*100).toFixed(2)
 }

}

async function getExecutions(){

 try{
  const res = await axios.get(`${N8N_URL}/rest/executions`)
  return res.data
 }catch{
  return []
 }

}

io.on("connection",(socket)=>{

 console.log("dashboard connected")

 setInterval(async()=>{

  const stats = await getServerStats()
  const executions = await getExecutions()

  socket.emit("stats",stats)
  socket.emit("executions",executions)

 },4000)

})

server.listen(3000,()=>{

 console.log("MASS monitor running")

})