var express = require('express');
var app = express();
var cron = require('node-cron');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index',{mascots: mascots, tagline: tagline});
});

app.post('/',function(req,res){
  // logic
})

cron.schedule('* * * * *',()=>{
    console.log('task senddo executada a cada minuto')
    res.status(200).json()

})



app.listen(3000);
console.log('8080 is the magic port');