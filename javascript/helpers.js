

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
    
    button.setAttribute('onclick',attributes[4]+'('+onclickValue+")")
    button.innerHTML=attributes[3]
    
    return button
}


function info(titre,msg){
    
    
    
    aGen=document.createElement('a')
    aGen.setAttribute('href',"#")
    aGen.setAttribute('class',"list-group-item list-group-item-action py-3 lh-tight")

    divTitre=document.createElement('div')
    divTitre.setAttribute('class',"d-flex w-100 align-items-center justify-content-between")

    strongTitre=document.createElement('strong')
    strongTitre.setAttribute('class',"mb-1")
    strongTitre.innerHTML=titre

    divTitre.appendChild(strongTitre)
    aGen.appendChild(divTitre)

    divMsg=document.createElement("div")
    divMsg.setAttribute('class',"col-10 mb-1 small")
    divMsg.innerHTML=msg

    aGen.appendChild(divMsg)

    document.getElementById('notif').appendChild(aGen)
    notif()
  }

  function notif(){
    
    button=document.getElementById("side")
    if(Nbnotif==0){
      bulleNotif=document.createElement('span')
      bulleNotif.setAttribute('class','badge')
      bulleNotif.setAttribute('id',"bulle")
      bulleNotif.innerHTML='1'
      button.innerHTML=button.innerHTML+" "
      button.appendChild(bulleNotif)

      
    }
    else{
      document.getElementById('bulle').innerHTML=Nbnotif+1
    }
    Nbnotif++
    
  }



