const mail = require('nodemailer')

let transporter = mail.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})


const sendMail=(erro)=>{
    mail.sendMail({
        from: '3cc329baab-1f6ae8@inbox.mailtrap.io',
        to: '3cc329baab-1f6ae8@inbox.mailtrap.io',
        subject: 'Dominio em Lentidão',
        text: `Os seguintes dominção estão com muita lantência:\n
               Host:${erro.hostname}\n
               Erro:${erro.errno,erro.code,erro.config.timeout}
        `
    },(err,data)=>{
        if(err){
            console.log('Error'+err)
        }else{
            console.log('Email enviado ao admin'+data)
        }
    })
}

 module.exports =sendMail