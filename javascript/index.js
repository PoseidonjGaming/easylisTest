var express=require("express");
var app=express();
var body=require('body-parser');
const Partie=require("./partieRepository")
const Concurrant=require("./concurrantRepository");

const server=require('http').Server(app)
const io=require('socket.io')(server)
const socketPartie=require('./PartieSocket')
const socketConcurrant=require('./ConcurrantSocket')





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
app.get('/CSS/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile('E:/Projet perso/easylisTest/CSS/style.css');
});

app.get('/socket.io/socket.io.js',(req,res)=>{
    res.set('Content-Type', 'text/javascript');
    res.sendFile("E:/Projet perso/easylisTest/node_modules/socket.io/client-dist/socket.io.js")
})







app.get("/",(req,res)=>{
    res.redirect("/parties")
})

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






app.get('/test',(req,res)=>{
    res.render('test.ejs')
})

io.on('connection',(socket)=>{
    
    socket.on("reqReloadPartie",function(){
        pool.query(Partie.getPartie(),(err,result)=>{
            socket.emit("reloadPartie",result.rows)
        })
    })
    
    socket.on("reqReloadConcurrant",function(){
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            socket.emit("reloadConcurrant",result.rows)
        })
    })
    socketPartie.addPartieClient(socket)
    socketPartie.modifPartieClient(socket)
    socketPartie.suppPartieClient(socket)
    socketPartie.terminerPartieClient(socket)

    socketConcurrant.addConcurrantClient(socket)
    socketConcurrant.modifConcurrantClient(socket)
    socketConcurrant.suppConcurrantClient(socket)
    
    
    
})


server.listen(80);

