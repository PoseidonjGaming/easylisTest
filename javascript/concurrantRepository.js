const requeteBundle=require('./requete.js')

function getConcurrant(){
    return requeteBundle.select('concurrant',null)
}

module.exports={
    getConcurrant
}