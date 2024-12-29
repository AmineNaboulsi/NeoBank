<?php 

require_once __DIR__ . '../../src/Config/DB_con.php';
require_once __DIR__ . '../../src/Models/Saving_Account.php';
require_once __DIR__ . '../../src/Routes/MainRouter.php';

header("Access-Control-Allow-Origin : *");
header('Content-Type: application/json');
$EndPoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

$MainRouter = new MainRouter();
$MainRouter->Dispatcher($EndPoint , $method);


// try{
//     $DB_con =new DB_con();
//     $DB_con->OpenConnection();
//     // echo json_encode(
//     //     $DB_con->SELECT(["*"] ,"Account" , null , null)
//     // ) ;
//     $Saving_Account = new Saving_Account("Owner5" , 100 ,5);
//     $DB_con->Save($Saving_Account);
    
//     echo json_encode(
//         $DB_con->Transaction(1,2, 3) 
//         ) ;
//     //$DB_con->CloseConnection();
// }catch(Exception $e){
//     echo json_encode([
//         'status' => false ,
//         'message' => $e->getMessage()
//     ]) ;
// }

?>