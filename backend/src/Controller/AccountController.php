<?php
require_once __DIR__ .'../../Config/DB_con.php';
require_once __DIR__ .'../../Models/Busniess_Account.php';

class AccountController {
    private $DB_con ;
    
    public function __construct()
    {
        $this->DB_con = new DB_con();
    }
    public function getAccount(){
        $this->DB_con->OpenConnection();
        return $this->DB_con->SELECT(["*"] , 'Account' , null , null);
    }
    public function getTransaction(){
        if(isset($_GET["id"])){
            //SELECT   * from Transaction WHERE 
            $id = $_GET["id"];
            $this->DB_con->OpenConnection();
            return $this->DB_con->SELECT(["*"] , 'Transaction' , "NumeroSender = $id" , null);
        }else{
            return [
                'status' => false ,
                'message' => "Missing parametres"
            ];
        }
    }
    public function Transaction(){
        $parametres = [
            "sender" , "to" , "amount"
        ];
        //check it exists any missing paraùetres on this list
        $missingpara = array_filter($parametres , function($par){
            return !isset($_GET[$par]);
        });
        if(!$missingpara){
            $this->DB_con->OpenConnection();
            return $this->DB_con->Transaction(
                $_GET["sender"], $_GET["to"] , $_GET["amount"]) ;
        }else{
            return [
                'status' => false ,
                'message' => "Missing parametres"
            ];
        }

    }
}

?>