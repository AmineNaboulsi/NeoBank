<?php 
require_once('./Account.php');

class Saving_Account extends Account{
    
    public $Minimum_Solde ; 
    public $Interest_Rate ; 

    public function __construct($libelle , $Minimum_Solde ,$Interest_Rate  )
    {
        parent::__construct($libelle);

        $this->Minimum_Solde = $Minimum_Solde ;
        $this->Interest_Rate = $Interest_Rate ;
    }

    public function __toString()
    {
        return "
        numero : $this->numero \n
        libelle : $this->libelle \n
        Solde : $this->Solde \n
        Minimum_Solde : $this->Minimum_Solde \n
        Interest_Rate : $this->Interest_Rate \n
        ";
    }
}