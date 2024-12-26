<?php 

class Current_Account extends Account{

    public $limitR ;

    public function __construct($libelle , $limitR)
    {
        parent::__construct($libelle);
        $this->limitR = $limitR ;
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

    //Save Account to db
    public function SaveData(PDO $con){
        $query = "CALL AddCurrentAccount(:Owner, :Solde,:limitR);";
        $SqlDataReader = $con->prepare($query);
        $SqlDataReader->execute([
                ":Owner" => $this->libelle ,
                ":Solde" => $this->Solde ,
                ":limitR" => $this->limitR
        ]);
            return [
                'status' => true ,
                'message' => "Account Added Successfuly"
            ];
        return  ;
    }
    public function DeleteData(PDO $con){
       
    }
    public function __toString()
    {
        return "
        numero : $this->numero \n
        libelle : $this->libelle \n
        Solde : $this->Solde \n
        limitR : $this->limitR \n
        ";
    }
}