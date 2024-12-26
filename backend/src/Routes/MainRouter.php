<?php 

require_once __DIR__ . '../../Controller/SavingController.php';
require_once __DIR__ . '../../Controller/CurrentController.php';

class MainRouter{

    private $routes = [];

    public function __construct()
    {
        $this->routes = [
            'GET' => 
            [
                '/getAccounts' => [SavingController::class , "save"],
                '/gettransactions' => [SavingController::class , "transation"],
            ],
            'POST' => 
            [
                '/addsavingaccount' => [SavingController::class , "save"],
                '/addcurrentaccount' => [CurrentController::class , "save"],
                '/addbusinessaccount' => [SavingController::class , "save"],

                '/transaction' => [SavingController::class , "transation"],
            ]
        ];
    }
    public function Dispatcher($uri ,$method){
        $route = strtok($uri, '?');

        if(isset($this->routes[$method][$route])){
            $controllerMethod = $this->routes[$method][$route];
         
            $controller = new $controllerMethod[0]();
            $method = $controllerMethod[1];
            
            $result = $controller->$method();
            
            header('Content-Type: application/json');
            echo json_encode($result);
           
        }else{
            echo json_encode([
                'status' => false ,
                'msg' => 'Invalid route action '
            ]);
        }
    }
}

?>