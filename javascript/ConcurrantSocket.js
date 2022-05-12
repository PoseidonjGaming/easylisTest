const Concurrant=require("./ConcurrantRepository")
const Pool=require('pg').Pool;
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis",
    password:'P@ssw0rd',
    port:5432
});
function addConcurrantClient(socket){
    socket.on('addConcurrantClient',(data)=>{
        JsonData=JSON.parse(data)
        prenom=JsonData.prenom
        nom=JsonData.nom
        
        
        
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            if(err){
                throw err
            }
            
            pool.query(Concurrant.insertConcurrant(prenom,nom,result.rowCount),(err,result)=>{
                
                if(err){
                    throw err
                }
                
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    concurrant=result.rows[result.rowCount-1]
                    msg='{"titre":"Un concurrant a été ajouté", "msg":"Le concurrant '+prenom+" "+nom+' a été ajouté"}'
                    
                    socket.broadcast.emit("newsConcurrant",msg);
                    socket.emit('reloadConcurrant',result.rows);
                })
            })
        })
        
    })
}

function modifConcurrantClient(socket){
    socket.on('modifConcurrantClient',(data)=>{
        JsonData=JSON.parse(data)
        prenom=JsonData.prenom
        nom=JsonData.nom
        id=JsonData.id
        console.log(JsonData)
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            if(err){
                throw err
            }
           
            console.log(Concurrant.updateConcurrant(id,prenom,nom))
            pool.query(Concurrant.updateConcurrant(id,prenom,nom),(err,result)=>{
                if(err){
                    throw err
                }
                
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    console.log(result.rows)
                    concurrant=result.rows[result.rowCount-1]
                    msg='{"titre":"Un concurrant a été modifiée", "msg":"Le concurrant '+concurrant.prenom+" "+concurrant.nom+' a été modifié"}'
                    
                    socket.broadcast.emit("newsConcurrant",msg);
                    socket.emit('reloadConcurrant',result.rows)
                })
                
            })
        })
        
    })
}

function suppConcurrantClient(socket){
    socket.on('suppConcurrantClient',(data)=>{
        JsonData=JSON.parse(data)
        id=JsonData.id
        
        pool.query(Concurrant.getConcurrantWhere(id),(err,result)=>{
            if(err){
                throw err
            }
            concurrant=result.rows[0]
            
            pool.query(Concurrant.deleteFrom(id),(err,result)=>{
                if(err){
                    throw err
                }
               
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    msg='{"titre":"Une concurrant a été supprimée", "msg":"Le concurrant '+concurrant.prenom+" "+concurrant.nom+' a été supprimer"}'
                    
                    socket.broadcast.emit("newsConcurrant",msg);
                    socket.emit('reloadConcurrant',result.rows)
                })
                
            })
        })
       
        
        
    })
}

function terminerConcurrantClient(socket){
    socket.on('terminerConcurrantClient',(data)=>{
        JsonData=JSON.parse(data)
        id=JsonData.id
        etat=JsonData.etat
        console.log(JsonData)
        console.log(id)
        pool.query(Concurrant.getConcurrantWhere(id),(err,result)=>{
            if(err){
                throw err
            }
           
            concurrant=result.rows[0]
            pool.query(Concurrant.terminerConcurrant(id,etat),(err,result)=>{
                if(err){
                    throw err
                }
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    msg='{"titre":"Une concurrant a été modifiée", "msg":""}'
                
                    socket.broadcast.emit("news",msg);
                    socket.emit('reload',result.rows)
                })
               
                
            })
        })
        
    })
}

module.exports={
   addConcurrantClient,
   modifConcurrantClient,
   suppConcurrantClient,
   terminerConcurrantClient
}