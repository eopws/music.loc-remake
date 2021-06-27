<?php

namespace App\Controllers;

require_once AL_A_SERVICES . 'TracksService.php';

class TracksController {
    private $service;

    public function getTracks() {
        if (!$this->service) {
            $this->init();
        }

        return $this->service->getTracks();
    }

    public function uploadTrack() {
        if (!$this->service) {
            $this->init();
        }

        $this->service->uploadTrack();
    }

    private function init() {
        $this->service = new \App\services\TracksService;
    }
}
