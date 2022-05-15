const requeteBundle=require('./requete.js')

function getConcurrant(){
    return requeteBundle.select('concurrant',null)
}

function getConcurrantWhere(id){
    return requeteBundle.where(requeteBundle.select('concurrant',null),[["",'id',id]])
}

function insertConcurrant(prenom,nom,maxRow){
    return requeteBundle.insert('concurrant',[prenom,nom],maxRow)
}

function updateConcurrant(id,prenom,nom){
    return requeteBundle.update('concurrant',[["prenom",prenom],["nom",nom]],id.slice(2,id.lenght))
}

function deleteFrom(id){
   return requeteBundle.deleteFrom("concurrant",id)
}
function deletesFrom(rows){
    return requeteBundle.where("DELETE FROM concurrant",rows)
}

function getConcurrantWheres(rows){
    return requeteBundle.where(requeteBundle.select('concurrant',null),rows)
}

module.exports={
    getConcurrant,
    getConcurrantWhere,
    insertConcurrant,
    updateConcurrant,
    deleteFrom,
    deletesFrom,
    getConcurrantWheres
}