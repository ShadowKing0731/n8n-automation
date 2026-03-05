const axios=require("axios")

async function sendAlert(msg){

await axios.post(
"https://api.callmebot.com/whatsapp.php",
null,
{
params:{
phone:"918096125091",
text:msg,
apikey:process.env.WA_KEY
}
})

}

module.exports=sendAlert