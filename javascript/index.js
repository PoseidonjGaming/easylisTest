var express=require("express");
var app=express();
var body=require('body-parser');
const Partie=require("./partieRepository")
const Concurrant=require("./concurrantRepository");
const requeteBundle=require("./requete")
const server=require('http').Server(app)
const io=require('socket.io')(server)
const socketPartie=require('./partieSocket')
const socketConcurrant=require('./concurrantSocket')
app.use(body.urlencoded({extended:true}))
const Pool=require('pg').Pool;
const pool=new Pool({
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
app.get('/CSS/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile('E:/Projet perso/easylisTest/CSS/style.css');
});


app.get('/socket.io/socket.io.js',(req,res)=>{
    res.set('Content-Type', 'text/javascript');
    res.sendFile("E:/Projet perso/easylisTest/node_modules/socket.io/client-dist/socket.io.js")
})




/*
    Concurrant et Partie conrtiennent les fonctions permettant de générer le text de la requète
    (exemple: Concurrant.getConcurrant()->"SELECT * FROM concurrant")

*/ 

//Route permettant d'accèder à la page d'accueil du site
app.get("/",(req,res)=>{
    res.redirect("/parties")
})
//Route permettant d'accèder à la  la page d'administration des concurrents
app.get('/concurrants',(req,res)=>{
   
    pool.query(Concurrant.getConcurrant(),(err,result)=>{
        if (err) {
            throw err
        }
        res.render('concurrant.ejs',{
            users: result.rows
        })
    })
    
});

//Route permettant d'accèder à la  la page d'administration des parties
app.get("/parties",(req,res)=>{
    
    pool.query(Partie.getPartie(),(err,result)=>{
        if (err) {
            throw err
        }
        parties=result.rows
        
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            concurrants=result.rows
            pool.query(requeteBundle.where(requeteBundle.select("partie",null),[['',"terminer",false]]),(err,result)=>{
                if(err){
                    throw err
                }
                
                res.render('parties.ejs',{
                    parties: parties,
                    concurrants:concurrants,
                    nbPartie:result.rowCount
                })
            })
            
            
        })        
    })
   
    
    
    
})






app.get('/test',(req,res)=>{
    res.render('test.ejs')
})

//Le serveur détecte la connection d'un client
io.on('connection',(socket)=>{
    
    //Le serveur renvoie les parties lorsqu'un client en fait la demande (bouton "Rafraîchir")
    socket.on("reqReloadPartie",function(){
        pool.query(Partie.getPartie(),(err,result)=>{
            socket.emit("reloadPartie",result.rows)
        })
    })
    
    //Le serveur renvoie les parties lorsqu'un client en fait la demande (bouton "Rafraîchir")
    socket.on("reqReloadConcurrant",function(){
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            socket.emit("reloadConcurrant",result.rows)
        })
    })

    //socketPartie contient les évenement ajout, modification, suppression et termine uine partie
    socketPartie.addPartieClient(socket)
    socketPartie.modifPartieClient(socket)
    socketPartie.suppPartieClient(socket)
    socketPartie.suppAllPartieClient(socket)
    socketPartie.terminerPartieClient(socket)

    //socketConcurrant contient les évenement ajout, modification, suppression un concurrant
    socketConcurrant.addConcurrantClient(socket)
    socketConcurrant.modifConcurrantClient(socket)
    socketConcurrant.suppConcurrantClient(socket)
    socketConcurrant.suppAllConcurrantClient(socket)
    
    
    
})


server.listen(80);