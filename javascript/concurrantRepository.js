const requeteBundle=require('./requete.js')

/*
    requeteBundle contient toutes les fonctions permettant de générer une requête (select, insert, update, where, order by)
    (exemple:requeteBundle.select('concurrant',null))->"SELECT * FROM concurrant")
*/

//Renvoie "SELECT * FROM concurrant"
function getConcurrant(){
    return requeteBundle.select('concurrant',null)
}

//Renvoie "SELECT * FROM concurrant WHERE id=" plus le paramètre id
function getConcurrantWhere(id){
    return requeteBundle.where(requeteBundle.select('concurrant',null),[["",'id',id]])
}

//Renvoie "INSERT INTO concurrant VALUES (" plus le nom, prénom et id du nouvel concurrent
function insertConcurrant(prenom,nom,maxRow){
    return requeteBundle.insert('concurrant',[prenom,nom],maxRow)
}
//Renvoie "UPDATE concurrant SET prenom=" plus le paramètre prénom plus ", nom=" plus le paramètre nom plus "WHERE id=" plus le paramètre id
function updateConcurrant(id,prenom,nom){
    return requeteBundle.update('concurrant',[["prenom",prenom],["nom",nom]],id.slice(2,id.lenght))
}
//Retourne "DELETE FROM concurrant WHERE id=" plus le paramètre id
function deleteFrom(id){
   return requeteBundle.deleteFrom("concurrant",id)
}
function deletesFrom(rows){
    return requeteBundle.where("DELETE FROM concurrant",rows)
}

//Retourne "DELETE FROM concurrant WHERE " plus les id des parties à supprimer
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