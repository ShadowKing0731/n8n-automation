const axios=require("axios")

async function renderServices(){

const r=await axios.get(
"https://api.render.com/v1/services",
{
headers:{
Authorization:"Bearer "+process.env.RENDER_API
}
})

return r.data

}

module.exports=renderServices