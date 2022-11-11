var express = require('express');
var app = express();
var cron = require('node-cron');
const fs = require('fs')
const bodyParser = require("body-parser");
const domain = require('./domain/domains.json')
const cors = require('cors')
const {getDomains} =require('./service/service')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  const file =fs.readFileSync('./domain/domains.json',{encoding:'utf8',flag:'r'});
  //console.log(file)
  res.end(file);
});

app.get('/logs',function(req,res){
  const logs =fs.readFileSync('./logs/logs.json',{encoding:'utf8',flag:'r'})
  res.end(logs);
})

app.post('/',function(req,res){
  const domain = req.body
  const data = fs.readFileSync('./domain/domains.json')
  var object =JSON.parse(data)
  object[0].domains.push(domain)
  //console.log(object[0])
  fs.writeFileSync('./domain/domains.json',JSON.stringify(object,null,2));
  res.status(200).json(domain)
})

if(domain[0].domains.length){
  cron.schedule('0 0 */1 * * *',()=>{
    console.log('task senddo executada a cada uma hora')
    getDomains()
    console.log('passou aqui')
  })
}





app.listen(3000);
console.log('servidor rodando na porta 3000');