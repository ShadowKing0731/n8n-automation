const socket = io("https://YOUR-RENDER-SERVER.onrender.com")

const ctx=document.getElementById("serverChart")

const serverChart=new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[
{
label:"CPU %",
data:[],
borderColor:"#38bdf8"
},
{
label:"RAM %",
data:[],
borderColor:"#ef4444"
}
]
}

})

const workflowChart=new Chart(

document.getElementById("workflowChart"),

{

type:"doughnut",

data:{
labels:["Success","Failed"],
datasets:[{
data:[0,0],
backgroundColor:["green","red"]
}]
}

})

socket.on("stats",(data)=>{

serverChart.data.labels.push("")

serverChart.data.datasets[0].data.push(data.cpu)
serverChart.data.datasets[1].data.push(data.ram)

serverChart.update()

addLog(`CPU ${data.cpu}% RAM ${data.ram}%`)

})

socket.on("executions",(data)=>{

let success=0
let fail=0

if(data.data){

data.data.forEach(e=>{

if(e.finished){

if(e.mode==="success") success++
else fail++

}

})

}

workflowChart.data.datasets[0].data=[success,fail]

workflowChart.update()

})

function addLog(text){

const logs=document.getElementById("logs")

const line=document.createElement("div")

line.innerText=new Date().toLocaleTimeString()+" "+text

logs.appendChild(line)

}

function openN8N(){

window.open("https://n8n-latest-z1mo.onrender.com")

}

function openCron(){

window.open("https://console.cron-job.org/jobs")

}