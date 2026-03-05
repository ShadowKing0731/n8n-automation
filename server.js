const express = require("express")
const axios = require("axios")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const N8N_URL = "https://n8n-latest-z1mo.onrender.com"

app.get("/workflows", async(req,res)=>{

try{

const response = await axios.get(`${N8N_URL}/rest/workflows`)

res.json(response.data)

}catch(e){

res.json({error:"cannot reach n8n"})

}

})

app.get("/executions", async(req,res)=>{

try{

const response = await axios.get(`${N8N_URL}/rest/executions`)

res.json(response.data)

}catch(e){

res.json({error:"execution fetch failed"})

}

})

io.on("connection",(socket)=>{

console.log("dashboard connected")

setInterval(()=>{

socket.emit("log",{
time:new Date().toLocaleTimeString(),
message:"Monitoring running"
})

},2000)

})

server.listen(3000,()=>{

console.log("Monitor running on port 3000")

})