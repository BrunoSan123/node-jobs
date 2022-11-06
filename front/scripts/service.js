const formContainer = document.querySelector('.form')
const historyBtn = document.querySelector('.history')
const status = document.querySelectorAll('.status')


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
    const statusDivPai=document.createElement('div')
    const statusDivs= document.createElement('div')
    const logButton= document.querySelectorAll('.status')
    const description =document.querySelector('.logs')
    console.log(history)
    history[0].domains.forEach((e)=>{
        const innerElements = `<div class="domain-item">${e.hosts}</div>`
        domainsContainer.innerHTML+=innerElements
        statusDivPai.append(domainsContainer)
       
    })

    logs.forEach((e)=>{
        const status =`<div class="status">${e.status}</div><div class="logs">${JSON.stringify(e)}</div>`
        statusDivs.innerHTML+=status
        if(e.status=='OK'){
            logButton.forEach((e)=>{
                e.classList.add("sucess")
            })
        }else if(e.status=='BAD'){
            logButton.forEach((e)=>{
                e.classList.add("danger")
            })
        }
        statusDivPai.append(statusDivs)
        console.log(e)
    })

    logButton.forEach((e)=>{
        e.addEventListener('click',()=>{
            description.classList.toggle("see")
        })
    })

    formContainer.append(statusDivPai)
    
    
    
}

historyBtn.addEventListener('click',insertHistory)