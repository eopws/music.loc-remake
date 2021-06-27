<?php

namespace Core;

class DBConnection {
    static private $connection;

    public function __construct() {
        if (!self::$connection) {
            $this->init();
        }

        return self::$connection;
    }

    private function init() {
        $connection = new \PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME,
        DB_LOGIN,
        DB_PASSWORD);

        $connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        self::$connection = $connection;
    }

    public function getConnection() {
        return self::$connection;
    }
}
