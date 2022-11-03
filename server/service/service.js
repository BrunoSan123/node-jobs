const domains =require('../domain/domains.json')
const axios = require('axios');
const timeout =1000*5
const fs = require('fs')
const sendMailer = require('../mail_service/mailer')


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
   const data = responses.map((target)=>{return ([
    {
        sucesso:[
            {status:target.status},
            {dominio:target.config.url},
            {tempo:target.config.timeout}
        ]
    }
])})
    const sucess = JSON.stringify(data)
    console.log(sucess)
    
 })).catch((err)=>{
    console.error(err.hostname,err.errno,err.code,err.config.timeout)
    if(err.config.timeout ==timeout){
       const dataErr = err
        console.log(dataErr.message)
        const erros =JSON.stringify(dataErr)
        fs.writeFileSync('../logs/logs.json',erros)
        sendMailer(err)
    }
 })
}

getDomains()


module.exports ={getDomains,timeout}