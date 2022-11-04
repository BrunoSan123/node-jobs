const domains =require('../domain/domains.json')
const axios = require('axios');
const timeout =1000*5
const fs = require('fs')
const sendMailer = require('../mail_service/mailer');
const { ok } = require('assert');


const request =domains[0].domains.map((target)=>{
    return axios({
        method:"get",
        url:target,
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
    
    console.log(data)
    const buffer =fs.readFileSync('./logs/logs.json')
    let blob = JSON.parse(buffer)
    blob.relatorios.push(data)
    fs.writeFileSync('./logs/logs.json',JSON.stringify(blob,null,2))
    
 })).catch((err)=>{
    console.error(err.hostname,err.errno,err.code)
    const buffer =fs.readFileSync('./logs/logs.json')
    let blob = JSON.parse(buffer)
    let commonErrors={
        status:'BAD',
        host:err.hostname,
        code:err.code,
        numero:err.errno,
        timeout:err.config.timeout
    }
    blob.relatorios.push(commonErrors)
    fs.writeFileSync('./logs/logs.json',JSON.stringify(blob,null,2))
    sendMailer(err)
    
 })
}

getDomains()




module.exports ={getDomains,timeout}