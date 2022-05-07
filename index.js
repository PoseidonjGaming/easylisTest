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

app.get("/parties",(req,res)=>{
   
   
    //console.log(requeteBundle.inner(requeteBundle.select('partie',null),['partie','adversaire1'],['concurrant','id']))
    requete=requeteBundle.inner(requeteBundle.select('partie',["adversaire1",'c1.prenom AS Prenom1','c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2']),[[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]])
    pool.query(requete,(err,result)=>{
        if (err) {
            throw err
        }
       
        res.render('parties.ejs',{
            parties: result.rows
        })
        //res.status(200).json(result.rows)
    })
    
    
    
    
})

function test1(){

}

app.listen(80);

