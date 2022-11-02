const domains =require('../domain/domains.json')
const axios = require('axios');


const request =domains.domains.map((target)=>{
    return axios.get(target)
})

console.log(request)

const getDomains =()=>{
 axios.all(request).then(axios.spread((...responses)=>{
    console.log(responses)
 }))
}


module.exports =getDomains