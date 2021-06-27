<?php

namespace App\Routes;

require_once AL_C_CORE . 'Router.php';
require_once AL_A_CONTROLLERS . 'TracksController.php';

$tracksRouter = new \Core\Router;

$controller = new \App\Controllers\TracksController;

$tracksRouter->post('/', [$controller, 'uploadTrack']);
$tracksRouter->get('/', [$controller, 'getTracks']);
