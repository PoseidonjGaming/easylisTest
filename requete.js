function select(table,champs){

    var select="SELECT"
    
    if(champs!=null){
        
        for(i=0; i<champs.length; i++){
            if(i==champs.length-1){
                select=select+i;
            }
            else{
                select=select+i+",";
            }
            
        }
    }
    else{
        select=select+" *"
        
    }
    return select+" FROM "+table
   

}

function where(req,selection){
    req=req+" Where"
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
module.exports = {
   select,
   where
  }