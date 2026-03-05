const axios=require("axios")

const N8N="https://n8n-latest-z1mo.onrender.com"

async function checkFailures(){

const r=await axios.get(N8N+"/rest/executions")

const failed=r.data.data.filter(e=>e.status==="error")

for(const f of failed){

console.log("Restart workflow",f.workflowId)

await axios.post(N8N+"/rest/workflows/"+f.workflowId+"/activate")

}

}

setInterval(checkFailures,60000)