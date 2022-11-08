const request = require('supertest');
const assert = require('assert');
const express = require('express')
const fs = require('fs');
const { it } = require('mocha');
const app = express();


describe('Requisição teste',()=>{
    describe('suite de testes para multiplas requisições',()=>{
        it('deve fazer uma requisição para o enpoint  principal trazendo ohistórico e estatus',()=>{
            

            app.get('/', function(req, res) {
                const file =fs.readFileSync('../domain/domains.json',{encoding:'utf8',flag:'r'});
                res.end(file);
              });
              
              request(app)
             .get('/')
             .expect(200)
             .end(function(err, res) {
                if (err)  throw err;
                console.log(res.request.req.res.text)
            });

        })

        it('deve fazer uma requisição para o endpoint /logs trazendo todos os logs registrados',()=>{
            app.get('/logs',function(req,res){
            const logs =fs.readFileSync('../logs/logs.json',{encoding:'utf8',flag:'r'})
            res.end(logs);
          })
          request(app)
          .get('/logs')
          .expect(200)
          .end(function(err, res) {
             if (err) throw err
             console.log(res.request.req.res.text)
         });

        })

        it('deve fazerum post para o endpoint base atualizando a base',()=>{
          app.post('/',function(req,res){
            const domain = req.body
            const data = fs.readFileSync('../domain/domains.json')
            var object =JSON.parse(data)
            object[0].domains.push(domain)
            fs.writeFileSync('../domain/domains.json',JSON.stringify(object,null,2));
            res.status(200).json(domain)
          })

          request(app)
          .post('/')
          .send({hosts:'https://www.rust-lang.org/pt-BR'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err
            console.log(res.body)
            
        })

        })
    })
})