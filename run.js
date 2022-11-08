var http = require('http');
var fs = require('fs');
var os = require("os");

const express = require('express')
const app = express()

http.createServer(function (req, res) {
  console.log(req.url);
  //console.log(req);
  if(req.method === 'GET'){
    var url = '';
    var index = req.url.indexOf('?');
    var path;
    if(index != -1)
      path = req.url.substring(0,index);
    else
      path = req.url;
    console.log('path: ' + path);
    switch(path){
      //Login
      case '/login':
        url = 'login.html';
        break;
      case '/logout':
        url = 'login.html';
        break;

      //Student page
      case '/main': //main
        url = 'main.html';
        break;
      case '/newpetition':
        url = 'newpetition.html';
        break;
      case '/statusstu':
        url = 'statusstu.html';
        break;
      case '/contactteach':
        url = 'contactteach.html';
        break;
      case '/studentinfo':
        url = 'studentinfo.html';
        break;
      case '/manual':
        url = 'manual.html';
        break;

      //Teacher page
      case '/mainteacher': //mainteach
        url = 'mainteacher.html';
        break;
      case '/checkword':
        url = 'checkword.html';
        break;
      case '/accword':
        url = 'accword.html';
        break;
      case '/statusteach':
        url = 'statusteach.html';
        break;
      case '/info':
        url = 'info.html';
        break;
      case '/money':
        url = 'money.html';
        break;

      //Json file
      case '/getJson':
        url = 'json/data.json';
        break;
      case '/getMoney':
        url = 'json/moneydate.json';
        break;
      //Other
	    case '/teach':
		    url = 'mainteacher.html';
		    break;
      case '/getStudent':
        url = 'res/student.json';
        break;
      case '/exit':
        process.exit();
        break;
      case '/getUser':
          url = 'json/user.json'
          break;
      default:
          if(req.url.includes('.')){
            url = req.url;
            break;
          }
          url = 'redirect.html';
          break;
      }

      console.log(url);
      if(url){
        if(url.charAt(0) == '/'){
          url = url.substring(1);
        }
        fs.readFile(url, function(err, data) {
        
            console.log(err);
            if(err){
              res.writeHead(404, {'Content-Type': 'text/html'});
              res.write('<h1>404 NOT FOUND</h1>');
              return res.end();
            }else{
              if(url.endsWith('.html'))
                res.writeHead(200, {'Content-Type': 'text/html'});
              else if(url.endsWith('.js')){
                res.writeHead(200, {'Content-Type': 'text/javascript'});
              }else if(url.endsWith('.css')){
                res.writeHead(200, {'Content-Type': 'text/css'});
              }else if(url.endsWith('.json')){
                res.writeHead(200, {'Content-Type': 'application/json'});
              }else{
                res.writeHead(200, {'Content-Type': 'text/plain'});
              }
              res.write(data);
              return res.end();
            }
        });
      }else{
        res.end();
      }
    }else if(req.method === 'POST'){
        var url = '';
        var index = req.url.indexOf('?');
        var path;
        if(index != -1)
          path = req.url.substring(0, index);
        else
          path = req.url;
        console.log('path: ' + path);
        switch(path){
          case '/saveStudent':
            req.on('data', chunk => {
              let json = JSON.parse(chunk) ;

              let outputJson = [];
              let data = fs.readFileSync('json/data.json', {encoding: 'utf-8'}) ;
              outputJson = JSON.parse(data);
              outputJson.push(json);
              outputJson = JSON.stringify(outputJson);

              fs.writeFileSync('json/data.json', outputJson)
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.write('ส่งคำร้องสำเร็จ');
              res.end();
            })
            break;
		      case '/updating':
            req.on('data', chunk => {
              let json = JSON.parse(chunk) ;
              json = JSON.stringify(json);

              fs.writeFileSync('json/data.json', json)
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.write('อัพเดทสถานะเรียบร้อย');
              res.end();
            })
            break;
          case '/upMoneyDate':
            req.on('data', chunk => {
              let json = JSON.parse(chunk) ;
              json = JSON.stringify(json);

              fs.writeFileSync('json/moneydate.json', json)
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.write('ตั้งวันเลยกำหนดเรียบร้อย');
              res.end();
              })
              break;
          default: res.end();
        }
    }else{
      res.end();
    }


}).listen(8080);

