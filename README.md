# Serviço simples de requisição para dominíos em NODE

### Instruções básicas.

O projeto possui duas pastas: front e server
entre na pasta 'server' e rode o comando npm install, depois de instalado execute com o comando npm start

Na pasta front siga o mesmo procedimento

ao ser emitido um erro, é gerado um arquivo de log `logs.json` que fica na pasta `logs`
Esse arquivo é enviado pela API ao front que é consumido pelo minu Dashboard.

o cliente smtp usado é o `nodemailer`, atualmente o cliente está com crendendias de testes que usei no desenvolvimento. usei o `mailtrap` para testes, mas será preciso que o usuario pegue as credenciais smtp  do serviço de email que o mesmo usa.

Aqui um exemplo de como usar [Gmail](https://bradhick.medium.com/nodejs-enviando-emails-com-gmail-e-nodemailer-9606f0be4819) com nodemailer

Caso queira customisar o tempo que a thread do `nodecron` executa, ficara aqui um [link](https://www.npmjs.com/package/node-cron) com um pequeno tutorial da lib `nodecron` 
