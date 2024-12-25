<?php 

class Account {
    protected $numero ;
    protected $libelle ;
    protected $Solde = 0 ;

    public function __construct(
        $libelle) { $this->libelle = $libelle ; }
    //Numero
    public function setnumero($new_numero){
        $this->numero==null ? 
        $this->numero = $new_numero :
        throw new Exception("Account all ready has and Id");
    }
    public function getnumero(){
        $this->numero ;
    }
    //libelle
    public function setlibelle($new_name){
        $this->libelle = $new_name ;
    }
    public function getlibelle(){
        $this->libelle ;
    }
    //Solde
    public function getSolde(){
        $this->Solde ; 
    }
}