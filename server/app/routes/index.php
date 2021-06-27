<?php

namespace App\Routes;

require_once AL_C_CORE . 'Router.php';
require_once AL_A_ROUTES . 'TracksRoutes.php';

$apiRouter = new \Core\Router;

$apiRouter->use('/tracks', $tracksRouter);
