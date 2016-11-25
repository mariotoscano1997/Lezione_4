
document.addEventListener('DOMContentLoaded', main);
var l=0;
var request = new XMLHttpRequest();
var x=[];
var n_dis=0;
var n_arr=0;
var intervallo;
dimWin=window.innerWidth-400;
function main(){
	
	formInizio = document.getElementById('form_inizio');
	//bottoneInizio=document.getElementById("bottone_inizio");
	bottoneAggiungi=document.getElementById("bottone_aggiungi");
	bottoneAvvia=document.getElementById("bottone_avvia");
	divPartecipanti= document.getElementById("partecipanti");
	divInformazioniForm= document.getElementById("informazioni");
	divGara=document.getElementById("mostraGara");
	//bottoneInizio.addEventListener('click', displayForm);
	if(bottoneAggiungi!=null)
		bottoneAggiungi.addEventListener('click', aggiungiPartecipante);
	if(bottoneAvvia!=null)
		bottoneAvvia.addEventListener('click', invia);
	request.addEventListener('readystatechange', onReadyStateChange);
	request.open('POST', "http://127.0.0.1/Lezione%204/inc/corsa.php", true);
}

function onReadyStateChange(){
	if (this.readyState === 4 && this.status === 200) {
		visualizza(this.response);

	}
}
function aggiungiPartecipante(){
	opzioni  =  "<option value='rossa'>Rosso</option>"+
	"<option value='verde'>Verde</option>"+
	"<option value='gialla'>Giallo</option>"+
	"<option value='nera'>Nero</option>"+
	"<option value='azzurra'>Azzurro</option>";
	document.getElementById("divCon"+l).innerHTML=
	"<div><label>Nome: <input type='text' id='user"+l+"'></label></div>"+
	"<div><label>Colore:"+ 
	"<select id='color"+l+"'>"+opzioni+"</select></label></div>"+
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
		
	
	if(n_arr<risposta.length){
			for(i=0; i<risposta.length ;i++){
				if(risposta[i].passi!=-1){
							if(n_dis<risposta[i].passi){
					spostamento=(dimWin*risposta[i].distanza[n_dis])/100;
					document.getElementById("macchina"+i).style.left= spostamento+"px";
				}
				else{ 
					n_arr++;
					document.getElementById("divPart"+i).innerHTML+="<label style='position: absolute; left:"+dimWin/2+"px'>"+n_arr+"</label>";
					risposta[i].passi=-1;
				}
			}
			
			}
			n_dis++;
		
	} else {
		console.log("sono uscito");
	clearInterval(intervallo);
}
}