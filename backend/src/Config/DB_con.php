<?php

require __DIR__ . '../../../vendor/autoload.php' ;
require_once __DIR__ . '../../Models/Account.php';
require_once  __DIR__ . '../../Models/Saving_Account.php';
use Dotenv\Dotenv;

class DB_con {
    private $con ; 
    private $HOST ;
    private $DB ;
    private $USER ;
    private $PASSWORD ;
    private $PORT ;
    //Constructor Default Only to get Env Variables
    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__ . '../../../');
        $dotenv->load();
        $this->HOST = $_ENV['HOST'];
        $this->DB = $_ENV['DATABASE'];
        $this->USER = $_ENV['USER'];
        $this->PASSWORD = $_ENV['PASSWORD'];
        $this->PORT = $_ENV['PORT'];
    }
    //Open Connection to db
    public function OpenConnection()  {
        try{
            $this->con = new PDO
            ("mysql:host=$this->HOST;dbname=$this->DB;port=$this->PORT;" ,$this->USER , $this->PASSWORD );
            
        }catch(PDOException $e){
            throw new Exception('Error Connection to database');
        }
    }
    //Hand made SELECT QUERY
    public function SELECT(array|string $columns, $table ,bool|null $isJoin ,string|null $jointable){
        try{
            if(!$this->ConnectionStatus())
                $this->OpenConnection();

            $query = "SELECT ";
            $query .= ( gettype($columns) =="string" ) ? $columns:  join(",",$columns) ;
            $query .= " FROM ".$table .($isJoin!=null && " NATURAL JOIN $jointable");
            // echo $query;
            $SQLDATAREADER = $this->con->prepare(
                $query 
            );
            $SQLDATAREADER->execute();
            // $Resultat = $SQLDATAREADER->get_result();
            $Resultat = $SQLDATAREADER->fetchAll();
            
            return $Resultat;
        }catch(Exception $e){
            return [
                'status' => false ,
                'message' => $e->getMessage()
            ];
        }
    } 
    //Hand made SELECT QUERY
    public function Save(Saving_Account|null $New_Account){
        try{
            if(!$this->ConnectionStatus())
                $this->OpenConnection();
            $Owner = $New_Account->getlibelle();
            $Solde = $New_Account->getSolde();
            $query = "";
            if($New_Account instanceof Saving_Account){
                $query = "CALL AddSavingAccount(:Owner, :Solde,:Minimum_Solde,:Interest_Rate);";
            }
            $SqlDataReader = $this->con->prepare($query);
            $SqlDataReader->execute([
                ":Owner" => $Owner ,
                ":Solde" => $Solde ,
                ":Minimum_Solde" => $New_Account->Minimum_Solde ,
                ":Interest_Rate" => $New_Account->Interest_Rate ,
            ]);
            // $query .= ($New_Account instanceof Saving_Account) &&
            // "AddCurrentAccount($New_Account->A,$New_Account->A,$New_Account->A,$New_Account->A)";
            // $query .= ($New_Account instanceof Saving_Account) && 
            // "AddBusinessAccount($New_Account->A,$New_Account->A,$New_Account->A,$New_Account->A)";

            return [
                'status' => true ,
                'message' => "Done operation"
            ];
        }catch(Exception $e){
            return [
                'status' => false ,
                'message' => $e->getMessage()
            ];
        }
    }
    //Check Connection Status 
    public function ConnectionStatus(){
        return $this->con;
    }
    //Close Connection with a null value to PDO
    public function CloseConnection()  {
        try{
            if($this->con){
                $this->con-> null ;
            }
        }catch(PDOException $e){
            throw new Exception('Error Closing Connection to database');
        }
    }
}

?>