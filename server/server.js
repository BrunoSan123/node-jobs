var express = require('express');
var app = express();
var cron = require('node-cron');
const fs = require('fs')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  //res.render('pages/index',{mascots: mascots, tagline: tagline});
  const file =fs.readFileSync('./domain/domains.json',{encoding:'utf8',flag:'r'});
  console.log(file)
  res.end(file);
});

app.post('/',function(req,res){
  const domain = req.body
  fs.appendFileSync('./domain/domains.json',JSON.stringify(domain));
  console.log(domain)
  res.status(200).json(domain)
})

cron.schedule('* * * * *',()=>{
    console.log('task senddo executada a cada minuto')
    res.status(200).json()

})



app.listen(3000);
console.log('8080 is the magic port');