const domains =require('../domain/domains.json')
const axios = require('axios');
const timeout =1000*5
const fs = require('fs')
const sendMailer = require('../mail_service/mailer');



const request =domains[0].domains.map((target)=>{
   return axios({
        method:"get",
        url:target.hosts,
        timeout:timeout
    })
})



const getDomains =()=>{
 axios.all(request).then(axios.spread((...responses)=>{
   const data = responses.map((target)=>{return (
    {
        status:'OK',
        response:{
            status:target.status,
            dominio:target.config.url,
            tempo:null
        }
    }
)})
    
    
    fs.writeFileSync('./logs/logs.json',JSON.stringify(data,null,2))
    
    
 })).catch((err)=>{
    //console.log(err)
    console.error(err.hostname,err.errno,err.code)
    const buffer =fs.readFileSync('./logs/logs.json')
    let blob = JSON.parse(buffer)
    domains.forEach((e)=>{
        const host =e.domains.filter((e)=>(e.hosts==err.config.url)).map((f)=>(f.hosts))
        console.log(host)
    })
    blob.filter((e)=>(e.response.dominio==err.config.url)).map((f)=>(f.response.dominio,f.status='BAD',f.response.tempo=err.request._currentRequest.socket.timeout,f.response.errorCode=err.code))
    fs.writeFileSync('./logs/logs.json',JSON.stringify(blob,null,2))
    sendMailer(err)
    
 })
}



module.exports ={getDomains,timeout}