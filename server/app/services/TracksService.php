<?php

namespace App\Services;

require_once AL_A_MODELS . 'TracksModel.php';
require_once AL_A_ERRORS . 'ApiError.php';

class TracksService {
    private $model;

    public function __construct() {
        $this->model = new \App\Models\TracksModel;
    }

    public function getTracks() {
        $limit = intval($_REQUEST['limit']) ?? 10;
        $page = intval($_REQUEST['page']) ?? 1;

        return json_encode($this->model->fetchAll($limit, $page));
    }

    public function uploadTrack() {
        if (!$_FILES['audio']) {
            throw \App\Errors\ApiError::badRequest('Audio file is not provided');
        }

        if (!$_REQUEST['duration']) {
            throw \App\Errors\ApiError::badRequest('Duration is not provided');
        }


        $audio = $_FILES['audio'];
        $img   = $_FILES['img'];

        // check is the audio file a real audio file
        if (!preg_match('{audio/(.*)}is', mime_content_type($audio['tmp_name']))) {
            throw \App\Errors\ApiError::badRequest('Audio file is invalid');
        }

        // audio file can't be bigger than 20MB
        if ($audio['size'] > 20971520) {
            throw \App\Errors\ApiError::badRequest('Audio file is too big');
        }

        if ($img) {
            // image file can't be bigger than 20MB
            if ($img['size'] > 20971520) {
                throw \App\Errors\ApiError::badRequest('Image file is too big');
            }

            // check is the audio file a real audio file
            if (!preg_match('{image/(.*)}is', mime_content_type($img['tmp_name']))) {
                throw \App\Errors\ApiError::badRequest('Image file is invalid');
            }

            $imgExtension = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
            $imgFileName = uniqid('', true) . '.' . $imgExtension;

            copy($_FILES['img']['tmp_name'], AL_A_STATIC . 'img/' . $imgFileName);
        }

        $audioExtension = pathinfo($_FILES['audio']['name'], PATHINFO_EXTENSION);
        $audioFileName = uniqid('', true) . '.' . $audioExtension;

        copy($_FILES['audio']['tmp_name'], AL_A_STATIC . 'audio/' . $audioFileName);

        $trackObject = [];

        $duration = $_REQUEST['duration'];
        $duration = round(intval($duration));

        $trackObject['title']    = $_REQUEST['title'] ?? 'Untitled';
        $trackObject['author']   = $_REQUEST['author'] ?? 'No name';
        $trackObject['duration'] = strval($duration);
        $trackObject['img']      = $imgFileName ?? 'track-default-img.png';
        $trackObject['audio']    = $audioFileName;

        $this->model->insert($trackObject);
    }
}
