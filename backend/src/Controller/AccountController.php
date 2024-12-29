<?php
require_once __DIR__ .'../../Config/DB_con.php';
require_once __DIR__ .'../../Models/Busniess_Account.php';
require_once __DIR__ .'../../Models/Account.php';
require_once __DIR__ .'../../Models/Current_Account.php';
require_once __DIR__ .'../../Models/Saving_Account.php';

class AccountController {
    private $DB_con ;
    
    public function __construct()
    {
        $this->DB_con = new DB_con();
    }
    public function getAccount(){
        $this->DB_con->OpenConnection();
          
        $SQlDATAREADER = $this->DB_con->getPDOCon()->prepare("CALL getAccounts();");

        $SQlDATAREADER->execute();
        $rowscount = $SQlDATAREADER->rowCount();
        $Resultat = $SQlDATAREADER->fetchAll(PDO::FETCH_ASSOC);
        
        return [
            "count" => $rowscount,
            "accounts" => $Resultat
        ];
    }
    public function getTransaction(){
        if(isset($_GET["id"])){
            //SELECT   * from Transaction WHERE 
            $id = $_GET["id"];
            $this->DB_con->OpenConnection();
            $Resultat =$this->DB_con->SELECT(["*"] , 'Transaction' , "NumeroSender = $id" , null);
            return $Resultat;
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

            $SQLDATAREADER = $this->DB_con->getPDOCon()->prepare("CALL getAccountType(:numero);");

            $SQLDATAREADER->execute([
                ':numero' => $_GET['sender']
            ]);
 
            $result = $SQLDATAREADER->fetch(PDO::FETCH_ASSOC);

            // Display the account type
            if ($result) {
                $AccountObject = null;
                if($result['AccountType'] == "ba") $AccountObject = new Business_Account('','');
                if($result['AccountType'] == "ca") $AccountObject = new Current_Account('','');
                if($result['AccountType'] == "sa") $AccountObject = new Saving_Account('','','');
                $con = new DB_con();
                $con->OpenConnection();
                return $AccountObject->Transaction($con->getPDOCon(),
                $_GET["sender"], $_GET["to"] , $_GET["amount"]) ;
            } 
           
        }else{
            return [
                'status' => false ,
                'message' => "Missing parametres"
            ];
        }

    }
    public function depo(){
        $parametres = [
            "numero" , "amount"
        ];
        //check it exists any missing paraùetres on this list
        $missingpara = array_filter($parametres , function($par){
            return !isset($_GET[$par]);
        }); 
        if(!$missingpara){
            $this->DB_con->OpenConnection();
          
            $SQlDATAREADER = $this->DB_con->getPDOCon()->prepare("UPDATE Account SET Solde = Solde + :depo  WHERE Numero = :Numero");

            if(
                !$SQlDATAREADER->execute([
                    ':Numero' => $_GET['numero'],
                    ':depo' => $_GET['amount'],
                ])
            ){
                return [
                    'status' => false ,
                    'message' => "Operation failed no raison specific"
                ];
            }else{
                return [
                    'status' => true ,
                    'message' => "Operation done successfuly"
                ];
            }
            
        }else{
            return [
                'status' => false ,
                'message' => "Missing parametres"
            ];
        }
    }
    public function withdraw(){
        echo 'cdpnz';
    }

}

?>