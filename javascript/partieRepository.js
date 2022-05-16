const requeteBundle=require('./requete.js')


/*
    requeteBundle contient toutes les fonctions permettant de générer une requête (select, insert, update, where, order by)
    (exemple:requeteBundle.update("partie",[["terminer",etat]], id)->"UPDATE partie SET prenom="test" WHERE id= 1")
*/

/*Retourne "SELECT partie.id,adversaire1, c1.prenom AS Prenom1, c1.nom AS Nom1, c2.prenom AS Prenom2, c2nom AS Nom2, terminer
    FROM partie INNER JOIN concurrant AS c1 ON c1.id=partie.adversaire1
*/
function getPartie(){
    req=requeteBundle.order(requeteBundle.inner(requeteBundle.select('partie',
    ["partie.id","adversaire1",'c1.prenom AS Prenom1',
    'c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2',"terminer"]),
    [[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]]),
    "ASC","id")
    
    return req
}

/*Retourne "SELECT partie.id,adversaire1, c1.prenom AS Prenom1, c1.nom AS Nom1, c2.prenom AS Prenom2, c2nom AS Nom2, terminer
    FROM partie INNER JOIN concurrant AS c1 ON c1.id=partie.adversaire1 WHERE id= paramètre id"
*/
function getPartieWhere(id){
    return requeteBundle.where(requeteBundle.inner(requeteBundle.select("partie",['c1.prenom AS Prenom1',
    'c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2']),
    [[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]]),
    [["","partie.id",id]])
}

/*
    Retourne "INSERT INTO partie VALUES (" plus les paramètre concurrant1, concurrant2,  id plus")"
*/
function insertPartie(concurrant1,concurrant2,maxRow){
    return requeteBundle.insert("partie",[concurrant1,concurrant2],maxRow)
}

/*
    Retourne "UPDATE partie SET adversaire1=" plus le paramètre concurrant1 (la valeur fournie par le client est "i1_ id du concurrent") plus "adversaire2=" plus le paramètre concurrant2 (la valeur fournie par le client est "i2_ id du concurrent") plus" WHERE id=" le paramètre id
*/
function updatePartie(id,concurrant1,concurrant2){
   return requeteBundle.update("partie",[["adversaire1",concurrant1.slice(3,concurrant1.lenght)],["adversaire2",concurrant2.slice(3,concurrant2.lenght)]], id)
}

/*
    Retourne "UPDATE partie SET termine=" plus le paramètre etat plus" WHERE id=" le paramètre id
*/
function terminerPartie(id,etat){
    return requeteBundle.update("partie",[["terminer",etat]], id)
}

/*
    Retourne "DELETE FROM partie WHERE id=" plus le paramètre id
*/
function deleteFrom(id){
    return requeteBundle.deleteFrom("partie",id)
}

/*
    Retourne "DELETE FROM partie WHERE " plus les id des parties à supprimer
*/
function deletesFrom(rows){
    return requeteBundle.where("DELETE FROM partie",rows)
}

function getPartieWheres(rows){
    return requeteBundle.where(requeteBundle.inner(requeteBundle.select("partie",['c1.prenom AS Prenom1',
    'c1.nom AS NOM1','adversaire2','c2.prenom AS Prenom2','c2.nom AS Nom2']),
    [[['partie','adversaire1'],['concurrant','c1','id']],[["partie",'adversaire2'],["concurrant",'c2','id']]]),
    rows)
}


module.exports={
    getPartie,
    insertPartie,
    updatePartie,
    deleteFrom,
    terminerPartie,
    getPartieWhere,
    deletesFrom,
    getPartieWheres
}