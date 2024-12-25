<?php 

abstract class Account {
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
    //numero
    public function getnumero(){
        $this->numero ;
    }
    //libelle
    abstract public function setlibelle($new_name);
    abstract public function getlibelle();

    //Solde
    abstract public function getSolde();
}