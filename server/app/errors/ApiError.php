<?php

namespace App\errors;

class ApiError extends \Exception {
    private function __construct(string $message, int $code) {
        parent::__construct($message, $code);
    }

    public static function badRequest(string $message) {
        return new ApiError($message, 400);
    }

    public static function notFound(string $message) {
        return new ApiError($message, 404);
    }

    public static function internal(string $message) {
        return new ApiError($message, 500);
    }

    public static function forbidden(string $message) {
        return new ApiError($message, 403);
    }
}
