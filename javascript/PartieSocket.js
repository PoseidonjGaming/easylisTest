const Partie=require("./partieRepository")
const Pool=require('pg').Pool;
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis",
    password:'P@ssw0rd',
    port:5432
});
function addPartieClient(socket){
    socket.on('addPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        concurrant1=JsonData.concurrant1
        concurrant2=JsonData.concurrant2
        
        pool.query(Partie.getPartie(),(err,result)=>{
            if(err){
                throw err
            }           
            pool.query(Partie.insertPartie(concurrant1.slice(3,concurrant1.lenght),concurrant2.slice(3,concurrant2.lenght),result.rowCount),(err,result)=>{
                if(err){
                    throw err
                }
                pool.query(Partie.getPartie(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    partie=result.rows[result.rowCount-1]
                    msg='{"titre":"Une partie a été ajoutée", "msg":"Une partie opposant '+partie.prenom1+" "+partie.nom1+' à '+partie.prenom2+" "+partie.nom2+' a été ajoutée"}'
                    
                    socket.broadcast.emit("newsPartie",msg);
                    socket.emit('reloadPartie',result.rows)
                })
            })
        })
        
    })
}

function modifPartieClient(socket){
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
                    if(err){
                        throw err
                    }
                    
                    partie=result.rows[result.rowCount-1]
                    msg='{"titre":"Une partie a été modifiée", "msg":"La partie opposant '+partie.prenom1+" "+partie.nom1+' à '+partie.prenom2+" "+partie.nom2+' a été modifiée"}'
                    
                    socket.broadcast.emit("newsPartie",msg);
                    socket.emit('reloadPartie',result.rows)
                })
                
            })
        })
        
    })
}

function suppPartieClient(socket){
    socket.on('suppPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        id=JsonData.id

        pool.query(Partie.getPartieWhere(id),(err,result)=>{
            if(err){
                throw err
            }
            partie=result.rows[0]
            
            pool.query(Partie.deleteFrom(id),(err,result)=>{
                if(err){
                    throw err
                }
               
                pool.query(Partie.getPartie(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    msg='{"titre":"Une partie a été supprimée", "msg":"La partie opposant '+partie.prenom1+" "+partie.nom1+' à '+partie.prenom2+" "+partie.nom2+' a été supprimée"}'
                    
                    socket.broadcast.emit("newsPartie",msg);
                    socket.emit('reloadPartie',result.rows)
                })
                
            })
        })
       
        
        
    })
}
function suppAllPartieClient(socket){
    socket.on('suppAllPartieClient',(data)=>{
       
        

        pool.query(Partie.getPartieWheres(data),(err,result)=>{
            if(err){
                throw err
            }
            partie=result.rows[0]
            
            pool.query(Partie.deletesFrom(data),(err,result)=>{
                if(err){
                    throw err
                }
               
                pool.query(Partie.getPartie(),(err,result)=>{
                    if(err){
                        throw err
                    }
                    
                    msg='{"titre":"Plusieurs parties ont été supprimées", "msg":"Plusieurs parties ont été supprimées"}'
                    
                    socket.broadcast.emit("newsPartie",msg);
                    socket.emit('reloadPartie',result.rows)
                })
                
            })
        })
       
        
        
    })
}

function terminerPartieClient(socket){
    socket.on('terminerPartieClient',(data)=>{
        JsonData=JSON.parse(data)
        id=JsonData.id
        etat=JsonData.etat
        
        pool.query(Partie.getPartieWhere(id),(err,result)=>{
            if(err){
                throw err
            }
           
            partie=result.rows[0]
            pool.query(Partie.terminerPartie(id,etat),(err,result)=>{
                if(err){
                    throw err
                }
                pool.query(Partie.getPartie(),(err,result)=>{
                    msg='{"titre":"Une partie a été modifiée", "msg":"La partie opposant '+partie.prenom1+" "+partie.nom1+' à '+partie.prenom2+" "+partie.nom2+' a été organisée"}'
                
                    socket.broadcast.emit("newsPartie",msg);
                    socket.emit('reloadPartie',result.rows)
                })
               
                
            })
        })
        
    })
}

module.exports={
   addPartieClient,
   modifPartieClient,
   suppPartieClient,
   suppAllPartieClient,
   terminerPartieClient
}