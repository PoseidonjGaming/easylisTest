//Renvoie "SELECT " plus les champs passés en paramètre
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

//Renvoie la requête plus "WHERE " plus les champs passés en paramètre
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

//Renvoie la requête plus "ORDER BY " plus la direction ("ASC" ou "DESC") plus le champ de trie
function order(req,direction,champ){
    return req+" ORDER BY "+champ+" "+direction
}

//Renvoi la requête "INNER JOIN " plus la table à joindre passé en paramètre plus "ON" plus le "lien" entre 2 table 
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

//Renvoie "INSERT INTO " plus la table dans laquelle insérer l'élément plus les élément. (NbRows consitue l'id de l'élément)
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

//Renvoie "DELETE FROM " plus la table dans laquelle supprimer l'élément plus "WHERE id=" plus l'id de l'élément
function deleteFrom(table,row){
    req="DELETE FROM "+table
    return where(req,[["","id",row]])
}

//Renvoie "UPDATE " plus la table dans laquelle modifier l'élément plus les champs à modifier de l'élément plus "WHERE id=" plus l'id de l'élément
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