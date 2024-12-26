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
    public function Save($New_Account){
        try{
            if(!$this->ConnectionStatus())
                $this->OpenConnection();

            $New_Account->SaveData($this->con);

            // $query .= ($New_Account instanceof Saving_Account) &&
            // "AddCurrentAccount($New_Account->A,$New_Account->A,$New_Account->A,$New_Account->A)";
            // $query .= ($New_Account instanceof Saving_Account) && 
            // "AddBusinessAccount($New_Account->A,$New_Account->A,$New_Account->A,$New_Account->A)";

        }catch(Exception $e){
            return [
                'status' => false ,
                'message' => $e->getMessage()
            ];
        }
    }
    public function Transaction($Sender , $To , $amount ){
        try{
            if(!$this->ConnectionStatus())
                $this->OpenConnection();

            $status = 0 ;
            $msg = "";
            $query = "CALL TRANSACTIONMoney(:from,:to,:amount, @status, @msg);";
            $SqlDataReader = $this->con->prepare($query);
            $SqlDataReader->execute([
                ":from" => $Sender ,
                ":to" => $To,
                ":amount" => $amount
            ]);
          
            $result = $this->con->query("SELECT @status as status, @msg as msg")->fetch(PDO::FETCH_ASSOC);
        
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