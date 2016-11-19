<?php
class Macchina implements JsonSerializable{
  private $colore;
  private $nomePossessore;
  private $distanza;
  private $passi;
  public function Macchina($col,$nome) {
    $this->colore = $col;
    $this->nomePossessore= $nome ;
    $this->passi=0  ;
  }

  public function getNomePossessore(){
    return $this->nomePossessore;
  }
  public function corri(){
    //genera un numero random
    $numero_random=rand ( 1 , 10 );
    if($this->passi>0)
      $this->distanza[$this->passi]=$this->distanza[$this->passi-1]+$numero_random;
    else 
      $this->distanza[$this->passi]=$numero_random; 
    $this->passi++;
  }
  public function controllaArrivo(){
    if(isset($this->distanza[$this->passi-1])){
      if($this->distanza[$this->passi-1]>=100){
        return true;
      }else 
      return false;
    }
    else
      return false;
  }
  public function jsonSerialize() {
    return Array (
      'colore'   => $this->colore,
      'nome'     => $this->nomePossessore,
      'distanza' => $this->distanza,
      'passi'    => $this->passi
    );
  }
  

}