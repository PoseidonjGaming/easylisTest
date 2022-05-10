const requeteBundle=require('./requete.js')

function getPartie(){
    req=requeteBundle.order(requeteBundle.inner(requeteBundle.select('partie',
    ["partie.id","adversaire1",'c1.prenom AS Prenom1',
    'c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2',"terminer"]),
    [[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]]),
    "ASC","id")
    
    return req
}

function insertPartie(concurrant1,concurrant2,maxRow){
    return requeteBundle.insert("partie",[concurrant1,concurrant2],maxRow)
}

function updatePartie(id,concurrant1,concurrant2){
   return requeteBundle.update("partie",[["adversaire1",concurrant1.slice(3,concurrant1.lenght)],["adversaire2",concurrant2.slice(3,concurrant2.lenght)]], id)
}
function terminerPartie(id,etat){
    return requeteBundle.update("partie",[["terminer",etat]], id)
 }

function deleteFrom(id){
    return requeteBundle.deleteFrom("partie",id)
}

module.exports={
    getPartie,
    insertPartie,
    updatePartie,
    deleteFrom,
    terminerPartie
}