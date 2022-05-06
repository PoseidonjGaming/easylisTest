var express=require("express");
var app=express();
var body=require('body-parser');
const requeteBundle=require('./requete.js')

app.use(body.urlencoded({extended:true}));
const Pool=require('pg').Pool;
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis",
    password:'P@ssw0rd',
    port:5432
});
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
   
    pool.query(requeteBundle.select("concurrant",null),(err,result)=>{
        if (err) {
            throw err
        }
        res.render('index.ejs',{
            users: result.rows
        })
    })
    
});

app.listen(80);

