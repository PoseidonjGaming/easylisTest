var express=require("express");
var app=express();
var body=require('body-parser');
const Partie=require("./partieRepository")
const Concurrant=require("./concurrantRepository")



app.use(body.urlencoded({extended:true}))

const Pool=require('pg').Pool;
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis",
    password:'P@ssw0rd',
    port:5432
});
app.set('view engine', 'ejs');

app.get('/javascript/helpers.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/helpers.js');
  });
app.get("/",(req,res)=>{
    res.redirect("/parties")
})

app.get('/concurrants',(req,res)=>{
   
    pool.query(Concurrant.getConcurrant(),(err,result)=>{
        if (err) {
            throw err
        }
        res.render('index.ejs',{
            users: result.rows
        })
    })
    
});

app.get("/parties",(req,res)=>{
    
    pool.query(Partie.getPartie(),(err,result)=>{
        if (err) {
            throw err
        }
        parties=result.rows
        
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            res.render('parties.ejs',{
                parties: parties,
                concurrants:result.rows
            })
            
        })        
    })
    
    
    
    
})

app.post('/suppr_partie/:id',(req,res)=>{
  
    pool.query(requeteBundle.deleteFrom("partie",req.params.id),(err,result)=>{
        if(err){
            throw err
        }
        res.redirect("/parties")
    })
})

app.get('/api/parties',(req,res)=>{  
   pool.query(Partie.getPartie(),(err,result)=>{
       res.send(result.rows)
   })
})

app.post("/api/add_partie",(req,res)=>{
    
    concurrant1=req.body.concurrant1
    concurrant2=req.body.concurrant2
    
    pool.query(Partie.getPartie(),(err,result)=>{
        if(err){
            throw err
        }
       
        pool.query(Partie.insertPartie(concurrant1.slice(3,concurrant1.lenght),concurrant2.slice(3,concurrant1.lenght),result.rowCount),(err,result)=>{
            if(err){
                throw err
            }
            
            res.end()
           
        })
    })
    
})

app.post("/api/modif_partie",(req,res)=>{
   
    concurrant1=req.body.concurrant1
    concurrant2=req.body.concurrant2
    id=req.body.id    
    pool.query(Partie.updatePartie(id,concurrant1,concurrant2),(err,result)=>{
        if(err){
            throw err
        }
        res.end()
    })
    
})

app.post("/api/suppr_partie",(req,res)=>{
    console.log(Partie.deleteFrom(req.body.id))
    pool.query(Partie.deleteFrom(req.body.id),(err,result)=>{
        res.end()
    })
})

app.listen(80);

