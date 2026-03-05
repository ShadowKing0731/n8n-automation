import axios from "axios"
import {CONFIG} from "./config.js"

export async function getExecutions(){

try{

const res = await axios.get(
`${CONFIG.N8N_URL}/rest/executions`
)

return res.data

}catch{

return []

}

}