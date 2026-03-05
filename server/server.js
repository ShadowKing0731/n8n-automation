const express=require("express")
const http=require("http")
const cors=require("cors")
const axios=require("axios")
const si=require("systeminformation")
const {Server}=require("socket.io")

const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
cors:{origin:"*"}
})

const N8N="https://n8n-latest-z1mo.onrender.com"

async function getServerStats(){

const cpu=await si.currentLoad()
const mem=await si.mem()

return{
cpu:cpu.currentLoad,
ram:mem.used/1024/1024
}

}

async function getExecutions(){

try{

const res=await axios.get(N8N+"/rest/executions")
return res.data

}catch(e){

return {error:true}

}

}

io.on("connection",socket=>{

console.log("dashboard connected")

setInterval(async()=>{

const stats=await getServerStats()
socket.emit("server",stats)

const executions=await getExecutions()
socket.emit("executions",executions)

},3000)

})

app.get("/api/workflows",async(req,res)=>{

const r=await axios.get(N8N+"/rest/workflows")
res.json(r.data)

})

app.get("/api/executions",async(req,res)=>{

const r=await axios.get(N8N+"/rest/executions")
res.json(r.data)

})

app.get("/api/server",async(req,res)=>{

res.json(await getServerStats())

})

server.listen(3000,()=>{

console.log("MASS Automation Cloud v2 running")

})