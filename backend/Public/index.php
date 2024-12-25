<?php 

require_once '../src/Config/DB_con.php';
require_once '../src/Models/Saving_Account.php';

header("Access-Control-Allow-Origin : *");
header('Content-Type: application/json');
$EndPoint = $_SERVER['REQUEST_URI'];

try{
    $DB_con =new DB_con();
    $DB_con->OpenConnection();
    // echo json_encode(
    //     $DB_con->SELECT(["*"] ,"Account" , null , null)
    // ) ;
    $Saving_Account = new Saving_Account("Owner5" , 100 ,5);

    echo json_encode(
            $DB_con->Save($Saving_Account)
        ) ;
    //$DB_con->CloseConnection();
}catch(Exception $e){
    echo json_encode([
        'status' => false ,
        'message' => $e->getMessage()
    ]) ;
}

?>