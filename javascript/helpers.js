
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
        terminer=document.createElement('td')
        if(e.terminer){
            terminer.innerHTML="Partie terminée "
        }
        else{
            terminer.innerHTML="Partie à organiser "
        }
        termineButton=createButton(["t_"+e.id],["btn btn-secondary","terminer","#modal_supprimer","Terminer","supprimer"])
        terminer.appendChild(termineButton)
        row.appendChild(terminer)
        colButton=document.createElement('td')
        colButton.setAttribute('style','text-align: center; vertical-align: middle;')
        colButton.appendChild(createButton([e.id,"i1_"+e.adversaire1,"i2_"+e.adversaire2],["btn btn-warning","modifPartie","#modal_modifier","Modifier","modifier"]))
        colButton.innerHTML=colButton.innerHTML+" "
        colButton.appendChild(createButton([e.id],["btn btn-danger","supPartie","#modal_supprimer","Supprimer","supprimer"]))
        
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

  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

function ReqReload(){
    socket.emit("reqReload")
    console.log(document.getElementById('notif').children)
    Array.from(document.getElementById('notif').children).forEach(function(e){
      e.remove()
    })
    bulle=document.getElementById('bulle')
    if(bulle!=null){
        bulle.remove()
    }
    Nbnotif=0
   
}