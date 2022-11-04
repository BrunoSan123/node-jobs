const formContainer = document.querySelector('.form')
const historyBtn = document.querySelector('.history')

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



async function insertHistory(){
    const history = await gotDomains('http://localhost:3000')
    const logs =await gotSucessLogs('http://localhost:3000/logs')
    const domainsContainer = document.createElement('div')
    console.log(history)
    console.log(logs)
    history[0].domains.forEach((e)=>{
        const innerElements = `<div class="domain-item">${e}</div>`
        domainsContainer.innerHTML+=innerElements
        formContainer.append(domainsContainer)
    })
    
    
}

historyBtn.addEventListener('click',insertHistory)

