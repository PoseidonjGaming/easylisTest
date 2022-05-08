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

app.get("/",(req,res)=>{
    res.redirect("/parties")
})

app.get('/concurrants',(req,res)=>{
   
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
    requete=requeteBundle.order(requeteBundle.inner(requeteBundle.select('partie',
    ["partie.id","adversaire1",'c1.prenom AS Prenom1','c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2']), 
    [[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]]),"ASC","id")
    pool.query(requete,(err,result)=>{
        if (err) {
            throw err
        }
        parties=result.rows
        pool.query(requeteBundle.select('concurrant',null),(err,result)=>{
            res.render('parties.ejs',{
                parties: parties,
                concurrants:result.rows
            })
            
        })
        //res.status(200).json(result.rows)
        
    })
    
    
    
    
})

app.post("/add_partie",(req,res)=>{
    
    pool.query(requeteBundle.select('partie',null),(err,result)=>{
        concurrant1=req.body.concurrant1
        concurrant2=req.body.concurrant2
        //console.log(requeteBundle.insert("partie",[concurrant1.slice(3,concurrant1.lenght),concurrant2.slice(3,concurrant2.lenght)],result.rowCount),requeteBundle.select('partie',null))
        pool.query(requeteBundle.insert("partie",[concurrant1.slice(3,concurrant1.lenght),concurrant2.slice(3,concurrant2.lenght)],result.rowCount),(err,result)=>{
            if(err){
                throw err
            }
            res.redirect("/parties")
        })
    })
})

app.post("/modif_partie/:id",(req,res)=>{
    concurrant1=req.body.concurrant1
    concurrant2=req.body.concurrant2
    console.log(requeteBundle.update("partie",[["adversaire1",concurrant1.slice(3,concurrant1.lenght)],["adversaire2",concurrant2.slice(3,concurrant2.lenght)]], req.params.id))
    pool.query(requeteBundle.update("partie",[["adversaire1",concurrant1.slice(3,concurrant1.lenght)],["adversaire2",concurrant2.slice(3,concurrant2.lenght)]], req.params.id),(err,result)=>{
        if(err){
            throw err
        }
        res.redirect("/parties")
    })
    
})

app.post('/suppr_partie/:id',(req,res)=>{
    //console.log(req.params,requeteBundle.deleteFrom("partie",req.params.id))
    pool.query(requeteBundle.deleteFrom("partie",req.params.id),(err,result)=>{
        if(err){
            throw err
        }
        res.redirect("/parties")
    })
})

app.listen(80);

