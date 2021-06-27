<?php

namespace App\Models;

require_once AL_C_CORE . 'Model.php';

class TracksModel extends \Core\Model {
    public function __construct() {
        parent::__construct();

        $this->table = 'tracks';

        $this->cols = [
            'title',
            'author',
            'duration',
            'img',
            'audio',
        ];
    }
}
