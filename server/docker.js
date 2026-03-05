const {exec}=require("child_process")

function dockerStats(callback){

exec("docker stats --no-stream",(err,stdout)=>{

if(err) return callback("docker unavailable")

callback(stdout)

})

}

module.exports=dockerStats