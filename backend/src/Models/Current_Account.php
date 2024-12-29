<?php 
require_once __DIR__ . '../../Interface/AccountOperation.php';

class Current_Account extends Account implements AccountOperation{

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
    public function Transaction(PDO $con ,$Sender , $To , $amount ){
        try{

            $query = "CALL TRANSACTIONMoney(:from,:to,:amount, @status, @msg);";
            $SqlDataReader = $con->prepare($query);
            $SqlDataReader->execute([
                ":from" => $Sender ,
                ":to" => $To,
                ":amount" => $amount
            ]);
          
            $result = $con->query("SELECT @status as status, @msg as msg")->fetch(PDO::FETCH_ASSOC);
            
            return [
                'status' => (bool)$result['status'],
                'message' => $result['msg']
            ];
           
        }catch(Exception $e){
            return [
                'status' => false ,
                'message' => $e->getMessage()
            ];
        }
    }
    public function DeleteData(PDO $con){
       
    }

    public function DepositAcc(PDO $con){

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