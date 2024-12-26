<?php
require_once __DIR__ .'../../Config/DB_con.php';
require_once __DIR__ .'../../Models/Current_Account.php';

class CurrentController {
    private $DB_con ;
    
    public function __construct()
    {
        $this->DB_con = new DB_con();
    }
    public function save(){
        //declare all value necessaire
        $parametres = [
            "libelle" , "limitR"
        ];
        //check it exists any missing paraùetres on this list
        $missingpara = array_filter($parametres , function($par){
            return !isset($_POST[$par]);
        });

        if(!$missingpara){
            $Current_Account = new Current_Account(
                $_POST['libelle'] , $_POST['limitR']
            );
            $this->DB_con->OpenConnection();
            return $this->DB_con->save($Current_Account);
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