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
            req=req+" "+selection[i][0]+" "+selection[i][1]
        }
        else{
            req=req+" "+selection[i][1]
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
        console.log(req)
    }

    return req
}


module.exports = {
   select,
   where,
   order,
   inner
  }