<?php 
require_once __DIR__ . '../../Models/Account.php' ;

class Saving_Account extends Account{
    
    public $Minimum_Solde ; 
    public $Interest_Rate ; 

    public function __construct($libelle , $Minimum_Solde ,$Interest_Rate)
    {
        parent::__construct($libelle);

        $this->Minimum_Solde = $Minimum_Solde ;
        $this->Interest_Rate = $Interest_Rate ;
    }

    //libelle
    public function setlibelle($new_name){
        $this->libelle = $new_name ;
    }
    public function getlibelle(){
        return $this->libelle ;
    }

    //Solde
    public function getSolde(){
        return $this->Solde ; 
    }

    public function SaveData(PDO $con){
        $query = "CALL AddSavingAccount(:Owner, :Solde,:Interest_Rate);";
        $SqlDataReader = $con->prepare($query);
        $SqlDataReader->execute([
                ":Owner" => $this->libelle ,
                ":Solde" => $this->Solde,
                ":Interest_Rate" => $this->Interest_Rate 
        ]);
            return [
                'status' => true ,
                'message' => "Done operation"
            ];
        return  ;
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