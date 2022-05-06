var express=require("express");
var app=express();
var body=require('body-parser');
const requete=require('./requete.js')

app.use(body.urlencoded({extended:true}));
const Pool=require('pg').Pool;
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis2",
    password:'P@ssw0rd',
    port:5432
});
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index.ejs')
   
    
    
    
});
app.get('/users',(req,res)=>{
   
    pool.query(requete.select('concurrant',null),(err,result)=>{
        console.log(result);
        //res.send(result);
        if (err) {
            throw err
          }
        res.status(200).json(result.rows)
    })
})
app.listen(80);

