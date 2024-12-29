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

    //get con
    public function getPDOCon(){
        return $this->con;
    }

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
    public function SELECT(array|string $columns, $table ,string|null $Where ,string|null $jointable){
        try{
            if(!$this->ConnectionStatus())
                $this->OpenConnection();

            $query = "SELECT ";
            $query .= ( gettype($columns) =="string" ) ? $columns:  join(",",$columns) ;
            $query .= " FROM ".$table .($jointable!=null && " NATURAL JOIN $jointable");
            $Where && $query .= " WHERE  ".$Where;
            // echo $query;
            $SQLDATAREADER = $this->con->query(
                $query 
            );
            $SQLDATAREADER->execute();
            // $Resultat = $SQLDATAREADER->get_result();
            $Data= [];
            $Resultat = $SQLDATAREADER->fetchAll(PDO::FETCH_ASSOC);
            // print_r($Resultat);
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
            $this->OpenConnection();

            $parametres = [
                "libelle" , "email"
            ];
            $missingpara = array_filter($parametres , function($par){
                return !isset($_POST[$par]);
            });
            if(!$missingpara){
                $etatValidation = $New_Account->CheckInfoValidation($_POST['libelle'] , $_POST['email']);
                if($etatValidation==0){
                    return $New_Account->SaveData($this->con);
                }else{
                    return [
                        'status' => false ,
                        'message' => "Name or email all ready used"
                    ];
                }
            }else{
                return [
                    'status' => false ,
                    'message' => "Missing parametres"
                ];
            }
            
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