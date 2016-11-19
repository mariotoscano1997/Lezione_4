<?php


include 'classeMacchina.php';
$giocatore = json_decode($_POST['partecipanti']);
$macchina = [];
$n_e=$_POST["n_elements"];
if(isset($_POST["n_elements"])){
	
	for($i=0;$i<$n_e;$i++){
		$colore = $giocatore[$i]->colore;
		$nome = $giocatore[$i]->nome;
		array_push($macchina, new Macchina($colore,$nome));
	}
	$h=0;
	while($h<$n_e){
		for($i=0 ;$i<$n_e;$i++)
			if(!$macchina[$i]->controllaArrivo()){
				$macchina[$i]->corri();
				if($macchina[$i]->controllaArrivo()){
					$h++;
				}
			}
		}
		echo json_encode($macchina);
	}

