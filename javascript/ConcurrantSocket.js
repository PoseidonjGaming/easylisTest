const Concurrant=require("./ConcurrantRepository")
const Partie=require('./partieRepository')
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
        
        pool.query(Concurrant.getConcurrant(),(err,result)=>{
            if(err){
                throw err
            }
           
            
            pool.query(Concurrant.updateConcurrant(id,prenom,nom),(err,result)=>{
                if(err){
                    throw err
                }
                
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    concurrant=result.rows[result.rowCount-1]
                    msg='{"titre":"Un concurrant a été modifié", "msg":"Le concurrant '+concurrant.prenom+" "+concurrant.nom+' a été modifié"}'
                    
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
                
               
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    msg='{"titre":"Un concurrant a été supprimée", "msg":"Le concurrant '+concurrant.prenom+" "+concurrant.nom+' a été supprimé"}'
                    
                    socket.broadcast.emit("newsConcurrant",msg);
                    socket.emit('reloadConcurrant',result.rows)
                })
                
            })
        })
       
        
        
    })
}

function suppAllConcurrantClient(socket){
    socket.on('suppAllConcurrantClient',(data)=>{
        
        
        pool.query(Concurrant.getConcurrantWheres(data),(err,result)=>{
            if(err){
                throw err
            }
            concurrant=result.rows[0]
            
            pool.query(Concurrant.deletesFrom(data),(err,result)=>{
                
                pool.query(Concurrant.getConcurrant(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    msg='{"titre":"Plusieurs concurrant ont été supprimés", "msg":"Plusieurs concurrant ont été supprimés"}'
                    
                    socket.broadcast.emit("newsConcurrant",msg);
                    socket.emit('reloadConcurrant',result.rows)
                })
                
            })
        })
       
        
        
    })
}


module.exports={
   addConcurrantClient,
   modifConcurrantClient,
   suppConcurrantClient,
  suppAllConcurrantClient
}