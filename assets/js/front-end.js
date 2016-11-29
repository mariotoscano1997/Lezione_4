
var n_arrivati=0;
var n_spostamenti=0;
document.addEventListener('DOMContentLoaded', function(){
	opzioni  =  "<option value='rossa'>Rosso</option>"+
	"<option value='verde'>Verde</option>"+
	"<option value='gialla'>Giallo</option>"+
	"<option value='nera'>Nero</option>"+
	"<option value='azzurra'>Azzurro</option>";
	formInizio = document.getElementById('form_inizio');
	bottoneAggiungi=document.getElementById("bottone_aggiungi");
	bottoneAvvia=document.getElementById("bottone_avvia");
	divPartecipanti= document.getElementById("partecipanti");
	divInformazioniForm= document.getElementById("informazioni");
	divGara=document.getElementById("mostraGara");
	inputN_elemets=document.getElementById("n_elements");
	nElementi=0;
	request = new XMLHttpRequest();
	var intervallo;
		if(bottoneAggiungi!=null)
		nElementi= bottoneAggiungi.addEventListener('click', aggiungiPartecipante.bind(bottoneAggiungi, opzioni,nElementi));
	if(bottoneAvvia!=null)
		bottoneAvvia.addEventListener('click', invia.bind(bottoneAvvia, request, formInizio));
	dimWin=window.innerWidth-400;
	request.addEventListener('readystatechange', onReadyStateChange);
	request.open('POST', "inc/corsa.php", true);
});

function onReadyStateChange(){
	if (this.readyState === 4 && this.status === 200) {
		visualizza(this.response);

	}
}
function aggiungiPartecipante(_opzioni){
	contatore =inputN_elemets.value;
	if(contatore!=7){
	document.getElementById("partecipanti").insertAdjacentHTML( 'beforeend', 
	"<div>"+
	"<div><label>Nome: <input type='text' id='user"+contatore+"' name='user"+contatore+"'></label></div>"+
	"<div><label>Colore:"+ 
	"<select id='color"+contatore+"' name='color"+contatore+"'>"+_opzioni+"</select></label></div>"+
	"</div>"+
	"</div>");
	contatore++;
	inputN_elemets.value=contatore;
	if(contatore==7){
		this.disabled=true;
	}
	}
	
}
function invia(_request,_nElementi){
	console.log(formInizio);
	var fd = new FormData(formInizio);
	
	_request.send(fd);
	return false;
}
function visualizza(risposta){
	formInizio.style.display ="none";
	risposta=JSON.parse(risposta);
	for (i=0;i<risposta.length;i++){ 
		stringa="<div id='divPart"+i+"'>"
		+"<label style='width: 100px; margin-left: 10px;	'>"+risposta[i].nome+"</label>"
		+"<img src='assets/img/traguardo.png' style='height: 100px; position: relative; left:"+(dimWin+150)+"px;'>"
		+"<img id='macchina"+i+"' src='assets/img/"+risposta[i].colore+".png' style='height: 100px; position: relative'></div> ";
		divGara.innerHTML+=stringa;
	}
	intervallo= setInterval(elaborazione.bind(this, risposta),400);	

}		
	
	
	
	
function elaborazione(risposta){
		
		if(n_arrivati<risposta.length){
			for(i=0; i<risposta.length ;i++){
				if(risposta[i].passi!=-1){
							if(n_spostamenti<risposta[i].passi){
					spostamento=(dimWin*risposta[i].distanza[n_spostamenti])/100;
					document.getElementById("macchina"+i).style.left= spostamento+"px";
				}
				else{ 
					n_arrivati++;
					document.getElementById("divPart"+i).innerHTML+="<label style='position: absolute; left:"+dimWin/2+"px'>"+n_arrivati+"</label>";
					risposta[i].passi=-1;
				}
			}
			
			}
			n_spostamenti++;
	}
		
	 else {
		console.log("sono uscito");
	clearInterval(intervallo);
}
}