<?php 

require_once __DIR__ . '../../Controller/SavingController.php';
require_once __DIR__ . '../../Controller/CurrentController.php';
require_once __DIR__ . '../../Controller/BusinessController.php';
require_once __DIR__ . '../../Controller/AccountController.php';

class MainRouter{

    private $routes = [];

    public function __construct()
    {
        $this->routes = [
            'GET' => 
            [
                '/getAccounts' => [AccountController::class , "getAccount"],
                '/getTransaction' => [AccountController::class , "getTransaction"],
            ],
            'POST' => 
            [
                '/addsavingaccount' => [SavingController::class , "save"],
                '/addcurrentaccount' => [CurrentController::class , "save"],
                '/addbusinessaccount' => [BusinessController::class , "save"],
            ],
            'PUT' => 
            [
                '/deposit' => [AccountController::class , "depo"],
            ],
            'DELETE' => 
            [
                '/delsavingaccount' => [SavingController::class , "delete"],
                '/delcurrentaccount' => [CurrentController::class , "delete"],
                '/delbusinessaccount' => [BusinessController::class , "delete"],
            ],
            'PATCH' => 
            [
                '/transaction' => [AccountController::class , "Transaction"],
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