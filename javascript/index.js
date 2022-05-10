var express=require("express");
var app=express();
var body=require('body-parser');
const Partie=require("./partieRepository")
const Concurrant=require("./concurrantRepository");

const server=require('http').Server(app)
const io=require('socket.io')(server)





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

app.get("/test/bool",(req,res)=>{
    res.send(true)
})

app.post('/terminer/:id',(req,res)=>{
    console.log(req.body)
})







app.post("/api/suppr_partie",(req,res)=>{
    console.log(Partie.deleteFrom(req.body.id))
    pool.query(Partie.deleteFrom(req.body.id),(err,result)=>{
        res.end()
    })
})

app.get('/test',(req,res)=>{
    res.render('test.ejs')
})

io.on('connection',(socket)=>{
    
    
    socket.on('addPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        concurrant1=JsonData.concurrant1
        concurrant2=JsonData.concurrant2
        console.log(concurrant1)
        pool.query(Partie.getPartie(),(err,result)=>{
            if(err){
                throw err
            }           
            pool.query(Partie.insertPartie(concurrant1.slice(3,concurrant1.lenght),concurrant2.slice(3,concurrant2.lenght),result.rowCount),(err,result)=>{
                if(err){
                    throw err
                }
                
                pool.query(Partie.getPartie(),(err,result)=>{
                    io.emit("reload",result.rows);
                })
                
            })
        })
        
    })
    socket.on('modifPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        concurrant1=JsonData.concurrant1
        concurrant2=JsonData.concurrant2
        id=JsonData.id
        
        pool.query(Partie.getPartie(),(err,result)=>{
            if(err){
                throw err
            }
           
           
            pool.query(Partie.updatePartie(id,concurrant1,concurrant2),(err,result)=>{
                if(err){
                    throw err
                }
                
                pool.query(Partie.getPartie(),(err,result)=>{
                    io.emit("reload",result.rows);
                })
                
            })
        })
        
    })
    socket.on('suppPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        id=JsonData.id
        
        pool.query(Partie.getPartie(),(err,result)=>{
            if(err){
                throw err
            }
           
           
            pool.query(Partie.deleteFrom(id),(err,result)=>{
                if(err){
                    throw err
                }
                
                pool.query(Partie.getPartie(),(err,result)=>{
                    io.emit("reload",result.rows);
                })
                
            })
        })
        
    })
})


server.listen(80);

