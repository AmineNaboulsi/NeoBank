<?php 
require_once __DIR__ . '../../Models/Account.php' ;
require_once __DIR__ . '../../Interface/AccountOperation.php';
    
class Business_Account extends Account implements AccountOperation{
    
    public $fee ; 

    public function __construct($libelle , $fee )
    {
        parent::__construct($libelle);
        $this->fee = $fee ;
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
        $query = "CALL AddBusinessAccount(:Owner, :Solde,:fee);";
        $SqlDataReader = $con->prepare($query);
        $SqlDataReader->execute([
                ":Owner" => $this->libelle ,
                ":Solde" => $this->Solde,
                ":fee" => $this->fee 
        ]);
        return [
                'status' => true ,
                'message' => "Account Added Successfuly"
        ];
        return  ;
    }
    public function DeleteData(PDO $con){
       
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
    public function DepositAcc(PDO $con){

    }

    public function __toString()
    {
        return "
        numero : $this->numero \n
        libelle : $this->libelle \n
        Solde : $this->Solde \n
        fee : $this->fee \n
        ";
    }
}