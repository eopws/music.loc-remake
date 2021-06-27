<?php

require_once 'config.php';
require_once AL_C_CORE . 'Router.php';
require_once AL_C_CORE . 'App.php';
require_once AL_A_ROUTES . 'index.php';

$router = new Core\Router;
$app = new Core\App;

$router->use('/api', $apiRouter);

$app->useRouter($router);

$app->start();
