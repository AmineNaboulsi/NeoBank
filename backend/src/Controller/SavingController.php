<?php
require_once __DIR__ . '../../Config/DB_con.php';
require_once __DIR__ . '../../Models/Saving_Account.php';

class SavingController {
    private $Saving_Account ;
    private $DB_con ;
    
    public function __construct()
    {
        $this->DB_con = new DB_con();
    }
    public function save(){
        //declare all value necessaire
        $parametres = [
            "libelle" , "Minimum_Solde" ,"Interest_Rate"
        ];
        //check it exists any missing paraùetres on this list
        $missingpara = array_filter($parametres , function($par){
            return isset($_POST[$par]);
        });

        if($missingpara){
            $Saving_Account = new Saving_Account(
                $_POST['libelle'] , $_POST['Minimum_Solde'] ,  $_POST['Interest_Rate']
            );
            $this->DB_con->OpenConnection();
            return $this->DB_con->save($Saving_Account);
        }else {
            return [
                'status' => false ,
                'message' => "Missing parametres"
            ];
        }
    }
    public function transaction(){

    }
}

?>