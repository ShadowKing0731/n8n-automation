import axios from "axios"

const N8N_URL="https://n8n-latest-z1mo.onrender.com"

export async function getExecutions(){

try{

const res = await axios.get(`${N8N_URL}/rest/executions`)

return res.data

}catch(err){

console.log("n8n error",err.message)

return []

}

}