const formContainer = document.querySelector('.form')
const historyBtn = document.querySelector('.history')
const domainField = document.getElementById("dominio")
const submit= document.getElementById("submitButton")



async function gotDomains(endpoint){
    const domains =await fetch(endpoint)
    const response =await domains.json()
    return response

}

async function gotSucessLogs(endpoint){
    const logs =await fetch(endpoint)
    const response =await logs.json()
    return response
}

async function sendDomain(endpoint){
   var  body={hosts:domainField.value}
   const rawResponse= fetch(endpoint,
        {
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },

            method:'POST',
            body:JSON.stringify(body)
        }
    )

    const content =await rawResponse.json()
    return content
}



async function insertHistory(){
    const history = await gotDomains('http://localhost:3000')
    const logs =await gotSucessLogs('http://localhost:3000/logs')
    const domainsContainer = document.createElement('div')
    const statusDivPai=document.createElement('div')
    const statusDivs= document.createElement('div')
    statusDivPai.classList.add("geralStatus")
    history[0].domains.forEach((e)=>{
        const innerElements = `<div class="domain-item">${e.hosts}</div>`
        domainsContainer.innerHTML+=innerElements
        statusDivPai.append(domainsContainer)
       
    })

    logs.forEach((e)=>{
        const status =`<div class="status">${e.status}</div><div class="logs">${JSON.stringify(e)}</div>`
        statusDivs.innerHTML+=status
        statusDivPai.append(statusDivs)
    })

    formContainer.append(statusDivPai)
    const status =[...document.querySelectorAll('.status')]
    const description =[...document.querySelectorAll('.logs')]
    status.forEach((e)=>{
        e.addEventListener('click',()=>{
           description.forEach((f)=>{
            f.classList.toggle("see")
            console.log(e)
           })
        })
    })
    
    
    
}

submit.addEventListener('click',()=>{
   const query= sendDomain('http://localhost:3000')
   if(query){
    alert('Dominio anexado com sucesso')
   }
})

historyBtn.addEventListener('click',insertHistory)




