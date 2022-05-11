const requeteBundle=require('./requete.js')

function getConcurrant(){
    return requeteBundle.select('concurrant',null)
}

function getConcurrantWhere(values){
    return requeteBundle.where(requeteBundle.select('concurrant',null),values)
}

module.exports={
    getConcurrant,
    getConcurrantWhere
}