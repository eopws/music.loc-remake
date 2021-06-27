<?php

namespace Core;

class App {
    private $router;

    public function useRouter(Router $router) {
        $this->router = $router;
    }

    public function start() {
    	header('Access-Control-Allow-Origin: *');

        try {
            $controller = $this->router->getController();

            if (is_array($controller)) {
                $object = $controller[0];
                $method = $controller[1];
                $response = $object->$method();
            } else {
                $response = $controller();
            }

            if ($response) {
                echo $response;
            }
        } catch (\Exception $e) {
            if (APP_DEBUG) {
                echo 'Script stopped with code: ' . '"' . $e->getCode() . '"';
                echo ' and message: ' . '"' . $e->getMessage() . '"';
            } else {
                echo '';
            }
        }
    }
}
