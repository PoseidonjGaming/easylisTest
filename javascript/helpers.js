
function populate(tableau,json){
    body=document.getElementById(tableau)
    deleteRow(body)
    Array.from(json).forEach(function(e){
     
        row=document.createElement('tr')
        row.setAttribute('style',"text-align: center; vertical-align: middle;")
        concurrant1=document.createElement('td')
        concurrant1.innerHTML=e.prenom1+" "+e.nom1
        console.log(concurrant1)
        row.appendChild(concurrant1)
        concurrant2=document.createElement('td')
        concurrant2.innerHTML=e.prenom2+" "+e.nom2
        row.appendChild(concurrant2)
        colButton=document.createElement('td')
        colButton.setAttribute('style','text-align: center; vertical-align: middle;')
        colButton.appendChild(createButton([e.id,"i1_"+e.adversaire1,"i2_"+e.adversaire2],["btn btn-warning","modifPartie","#modal_modifier","Modifier"]))
        colButton.appendChild(createButton([e.id],["btn btn-danger","supPartie","#modal_supprimer","Supprimer"]))
        row.appendChild(colButton)
        body.appendChild(row)
        
        
    })
    
    
    
}

function deleteRow(tableau){
    Array.from(tableau.children).forEach(function(e){
        e.remove()
    })
}


function encode(data){
    json="{"
    for (let i = 0; i < data.length; i++) {
        if(i==data.length-1){
            json=json+'"'+data[i][0]+'":"'+data[i][1]+'"'
        }
        else{
            json=json+'"'+data[i][0]+'":"'+data[i][1]+'",'
        }
    }
    return json+"}"
}

function createButton(values,attributes){
    button=document.createElement('button')
    button.setAttribute('type',"button")
    button.setAttribute('class',attributes[0])
    button.setAttribute('id',attributes[1])
    button.setAttribute('name',attributes[1])
    button.setAttribute('data-bs-toggle',"modal")
    button.setAttribute("data-bs-target",attributes[2])
    onclickValue=""
    for (let i = 0; i < values.length; i++) {
        if(i==values.length-1){
            onclickValue=onclickValue+"'"+values[i]+"'"
        }else{
            onclickValue=onclickValue+"'"+values[i]+"',"
        }
    }
    
    button.setAttribute('onclick','modifier('+onclickValue+")")
    button.innerHTML=attributes[3]
    
    return button
}


