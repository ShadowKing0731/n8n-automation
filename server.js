import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import axios from "axios"
import si from "systeminformation"

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{cors:{origin:"*"}})

const N8N_URL = "https://n8n-latest-z1mo.onrender.com"

app.get("/n8n/workflows", async (req,res)=>{
    try{
        const r = await axios.get(`${N8N_URL}/rest/workflows`)
        res.json(r.data)
    }catch(e){
        res.json({error:e.message})
    }
})

app.get("/n8n/executions", async (req,res)=>{
    try{
        const r = await axios.get(`${N8N_URL}/rest/executions`)
        res.json(r.data)
    }catch(e){
        res.json({error:e.message})
    }
})

app.get("/server/stats", async (req,res)=>{
    const cpu = await si.currentLoad()
    const mem = await si.mem()

    res.json({
        cpu:cpu.currentLoad,
        ram:(mem.used/mem.total*100)
    })
})

io.on("connection",(socket)=>{

    setInterval(async ()=>{
        const cpu = await si.currentLoad()
        const mem = await si.mem()

        socket.emit("server",{
            cpu:cpu.currentLoad,
            ram:(mem.used/mem.total*100)
        })
    },3000)

})

server.listen(3000,()=>{
console.log("Monitoring server running")
})
