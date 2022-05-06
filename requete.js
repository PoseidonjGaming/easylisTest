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
module.exports = {
   select
  }