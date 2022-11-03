const domains =require('../domain/domains.json')
const axios = require('axios');
const timeout =1000*5
const fs = require('fs')
const sendMail = require('../mail_service/mailer')


const request =domains.domains.map((target)=>{
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
       const dataErr = err.map((target)=>{return([
        {erros:[
            {status:target.code},
            {dominio:target.hostname},
            {erro:target.errno},
            {tempo:target.config.timeout}
        ]}
       ])})
        console.log(dataErr)
        const erros =JSON.stringify(dataErr)
        fs.writeFileSync('../logs/logs.json',erros)
        sendMail(err)
    }
 })
}

getDomains()


module.exports ={getDomains,timeout}