<?php

namespace Core;

require_once AL_C_CORE . 'DBConnection.php';
require_once AL_A_ERRORS . 'ApiError.php';

abstract class Model {
    protected $table;
    protected $cols = [];

    public function __construct() {
        $dbConnection = new DBConnection;

        $this->connection = $dbConnection->getConnection();
    }

    public function fetchAll(int $limit, int $page) {
        $tracksCount = $this->connection->query("SELECT COUNT(*) FROM `$this->table`")->fetchColumn();

        $offset = $page * $limit - $limit;

        $query = $this->connection->prepare("SELECT * FROM `$this->table` WHERE `id` > $offset LIMIT $limit");

        $query->execute();

        $tracks = $query->fetchAll(\PDO::FETCH_ASSOC);

        $results = [
            'totalCount' => $tracksCount,
            'data' => $tracks,
        ];

        return $results;
    }

    public function insert(array $object) {
        $colsString = '';
        $insertValues = [];

        foreach ($this->cols as $col) {
            $colsString .= $col . ',';

            if ($object[ $col ]) {
                $insertValues[] = $object[ $col ];
            } else {
                throw \App\Errors\ApiError::badRequest('Invalid object params in ' . get_called_class() . ' model');
            }
        }

        $colsString = substr($colsString, 0, -1);

        $statementParams = str_repeat('?,', count($insertValues));
        $statementParams = substr($statementParams, 0, -1);

        $insertStatement = $this->connection->prepare("INSERT INTO `$this->table` ($colsString)
            VALUES ($statementParams)");

        $insertSuccess = $insertStatement->execute($insertValues);

        if (!$insertSuccess) {
            throw \App\Errors\ApiError::internal('Insert statement ended with error');
        }
    }
}
