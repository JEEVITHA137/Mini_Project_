const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'projectdb',
  multipleStatements: true
});
connection.connect();

app.get('/login',(req,res)=>{
  connection.query('select * from register',function(err,result){
      if(err)
      {
        return res.send(err);
      }
      else {
        return res.json({
          data:result
        })
      }
  });
});

app.get('/register/add',(req,res) => {
  const {name,email,pass,roll,department,year,hint,api}=req.query;
  const register = `insert into register values ('${email}','${name}','${pass}','${roll}','${department}','${year}','${hint}','${api}')`;
  connection.query(register,function(err,result){
    if(err)
    {
      return res.send("invalid")
    }
    else {
      return res.send("successful")
    }
  });
});

app.get('/select',(req,res) => {
  connection.query('select * from register',function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});

app.get('/api',(req,res)=>{
  connection.query('select Email,APIKey from register',function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});

app.post('/profile',(req,res)=>{
  const roll = req.query;
  const update = `Update register set RollNo='10' where Email='jeevi@gmail.com'`;
  connection.query(update,function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});

app.get('/user/:id',(req,res)=>{
  connection.query('select ApiKey from register where Email=?',[req.params.id],function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});


app.get('/rainsensor/:id',(req,res)=>{
  connection.query('select moisture,Nonmoisture from moisture where ApiKey=?',[req.params.id],function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});

app.get('/irsensor/:id',(req,res)=>{
  connection.query('select label,value from irsensor where ApiKey=?',[req.params.id],function(err,result){
    if(err)
    {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
  });
});

app.listen(4000,()=>{
  console.log("connected");
});
