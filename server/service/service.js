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

//console.log(request)

const getDomains =()=>{
 axios.all(request).then(axios.spread((...responses)=>{
   const data = responses.map((target)=>{return (
    {
        status:'OK',
        sucesso:{
            status:target.status,
            dominio:target.config.url,
            tempo:target.config.timeout
        }
    }
)})
    
    //console.log(data)
    fs.writeFileSync('../logs/logs.json',JSON.stringify(data,null,2))
    
    
 })).catch((err)=>{
    //console.log(err)
    console.error(err.hostname,err.errno,err.code)
    const buffer =fs.readFileSync('../logs/logs.json')
    let blob = JSON.parse(buffer)
    domains.forEach((e)=>{
        const host =e.domains.filter((e)=>(e.hosts==err.config.url)).map((f)=>(f.hosts))
        console.log(host)
    })

    blob.filter((e)=>(e.sucesso.dominio==err.config.url)).map((f)=>(f.sucesso.dominio,f.status='BAD'))
    fs.writeFileSync('../logs/logs.json',JSON.stringify(blob,null,2))
    //sendMailer(err)
    
 })
}


getDomains()



module.exports ={getDomains,timeout}