import si from "systeminformation"

export async function getStats(){

const cpu = await si.currentLoad()
const mem = await si.mem()

return{
cpu: cpu.currentLoad.toFixed(2),
ram: ((mem.used/mem.total)*100).toFixed(2)
}

}