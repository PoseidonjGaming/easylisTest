function select(table,champs){

    var select="SELECT"
    
    if(champs!=null){
        
        for(i=0; i<champs.length; i++){
            if(i==champs.length-1){
                select=select+" "+champs[i];
            }
            else{
                select=select+" "+champs[i]+" ,";
            }
            
        }
    }
    else{
        select=select+" *"
        
    }
    
    return select+" FROM "+table
   

}

function where(req,selection){
    req=req+" WHERE"
    
    for(i=0; i<selection.length; i++){
        
        if(i!=0){
            req=req+" "+selection[i][0]+" "+selection[i][1]+" = "+selection[i][2]
        }
        else{
            req=req+" "+selection[i][1]+" = "+selection[i][2]
        }
    }
    return req
}

function order(req,direction,champ){
    return req+" ORDER BY "+champ+" "+direction
}

function inner(req,inner){
    
    for (i = 0; i < inner.length; i++) {
        target=inner[i][1][0]
        start=inner[i][0][0]
        alias=inner[i][1][1]
        PRKey=inner[i][1][2]
        FRKey=inner[i][0][1]
        req=req+' INNER JOIN '+target+" AS "+alias+" ON "+alias+"."+PRKey+" = "+start+"."+FRKey
        
    }

    return req
}

function insert(table,element, nbRows){
    req="INSERT INTO "+table+" VALUES ("+nbRows
    for (i = 0; i < element.length; i++) {
        if(typeof element[i]==typeof 1){
            req=req+","+element[i]
        }
        else if(typeof element[i]==typeof "test"){
            req=req+",'"+element[i]+"'"
        }
       
        
    }
    return req+");"
}

function deleteFrom(table,row){
    req="DELETE FROM "+table
    return where(req,[["","id",row]])
}

function update(table,modif,id){
    req="UPDATE "+table+" SET "
    for (i = 0; i < modif.length; i++) {
        req=req+modif[i][0]+"="
        if(i!=modif.length-1){
            if(typeof modif[i][1]==typeof 1){
                req=req+modif[i][1]+", "
            }
            else if(typeof modif[i][1]==typeof "test"){
                req=req+"'"+modif[i][1]+"', "
            }
            
        }
        else{
            if(typeof modif[i][1]==typeof 1){
                req=req+modif[i][1]+" "
            }
            else if(typeof modif[i][1]==typeof "test"){
                req=req+"'"+modif[i][1]+"' "
            }
        }
        
        
    }
    return where(req,[["",'id',id]])
}

module.exports = {
   select,
   where,
   order,
   inner,
   insert,
   update,
   deleteFrom  
}