<?php 

abstract class Account {
    protected $numero ;
    protected $libelle ;
    protected $Solde = 0 ;
    private $DB_con ;

    public function __construct(
        $libelle) { $this->libelle = $libelle ;
            $this->DB_con = new DB_con();
        }
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

    public function CheckInfoValidation($libelle , $email){
        if(strtolower($libelle)=='mainbankaccount'){
             return [
                    'status' => false ,
                    'message' => "Name MainBankAccount Can't be added as a owner name"
                ];
        }
        $this->DB_con->OpenConnection();
          
            $SQlDATAREADER = $this->DB_con->getPDOCon()->prepare("Select * from Account 
            WHERE Owner = :libelle or Email =  :email");
      
            if(
                !$SQlDATAREADER->execute([
                    ':libelle' => $libelle,
                    ':email' => $email,
                ])
            ){
                return [
                    'status' => false ,
                    'message' => "Operation failed no raison specific"
                ];
            }else{
                $rows = $SQlDATAREADER->rowCount();
                return $rows;
            }
    }

    //libelle
    abstract public function setlibelle($new_name);
    abstract public function getlibelle();

    //Insert Data to database
    abstract public function SaveData(PDO $con);

    //Delete Data FROM database
    abstract public function DeleteData(PDO $con);
    
    //Solde
    abstract public function getSolde();
    abstract public function Transaction(PDO $con ,$Sender , $To , $amount);
}