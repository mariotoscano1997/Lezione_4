
document.addEventListener('DOMContentLoaded', main);
var l=0;
var request = new XMLHttpRequest();
var x=[];
var risultato=[];
function main(){
	
	formInizio = document.getElementById('form_inizio');
	bottoneInizio=document.getElementById("bottone_inizio");
	bottoneAggiungi=document.getElementById("bottone_aggiungi");
	divPartecipanti= document.getElementById("partecipanti");
	divInformazioniForm= document.getElementById("informazioni");

    //bottoneInizio.addEventListener('click', displayForm);
    if(bottoneAggiungi!=null)
    	bottoneAggiungi.addEventListener('click', aggiungiPartecipante);
    request.addEventListener('readystatechange', onReadyStateChange);
    request.open('POST', "http://127.0.0.1/Lezione%204/inc/corsa.php", true);
    console.log(risultato);
}

function onReadyStateChange(){
	console.log("entrato");
	if (this.readyState === 4 && this.status === 200) {
		console.log("C'è" +this.response);
		console.log("il sixe" + this.response.length);
		risultato=this.response;

	}
}

/*function displayForm(){
	
	bottoneInizio.style.display="none";
	formInizio.style.display="block";
}*/

function aggiungiPartecipante(){
	document.getElementById("divCon"+l).innerHTML=
	"<div><label>Nome: <input type='text' id='user"+l+"'></label></div>"+
	"<div><label>Colore: <input type='text' id='color"+l+"'></label></div>"+
	"</div>"+
	"<div id='divCon"+(l+1)+"'></div>"
	;
	l++;
	divInformazioniForm.innerHTML="<input type='hidden' name='n_elements'"+
	"value='"+l+"'>";
}
function invia(){
	for(i=0;i<l;i++){
		nome=document.getElementById("user"+i).value;
		colore=document.getElementById("color"+i).value;
		x.push({
			'nome': nome,
			'colore' : colore
		});
	} 
	var fd = new FormData();
	fd.append('partecipanti', JSON.stringify(x));
	fd.append('n_elements',l);
	request.send(fd);
	return false;
}		