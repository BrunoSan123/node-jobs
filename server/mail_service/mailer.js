const mail = require('nodemailer')


let transporter = mail.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b2c1fa3d3e864",
    pass: "5c2082934bcb91"
  }
})


const sendMailer=(erro)=>{
    transporter.sendMail({
        from: 'bruno-kk@hotmail.com',
        to: '3cc329baab-1f6ae8@inbox.mailtrap.io',
        subject: 'Dominio em Lentidão',
        text: `Os seguintes dominção estão com muita lantência:\n
               Host:${erro.hostname}\n
               Erro:${erro.errno,erro.code,erro.config.timeout}
        `
    },(err,data)=>{
        if(err){
            console.log(process.env.HOST)
            console.log(err)
        }else{
            console.log('Email enviado ao admin'+data)
        }
    })
}

 module.exports =sendMailer