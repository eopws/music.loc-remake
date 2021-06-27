<?php

namespace Core;

require_once AL_A_ERRORS . 'ApiError.php';

/**
 * Router connects a particular URL with a controller
 */
final class Router {
    // requested url
    private $URL;
    // HTTP method (POST, GET etc.)
    private $method;

    private $childRouters = [];

    private $postRoutes = [];

    private $getRoutes = [];

    public function __construct() {
        $this->URL    = $_SERVER['REQUEST_URI'];
        $this->method = $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Extends this router with another router
     *
     * @param string $path - a relative or full URL
     * @param Router $router - a router
     *
     * @return void
     */
    public function use(string $path, Router $router) {
        $path = $this->normalizePath($path);

        $this->childRouters[$path] = $router;
    }

    /**
     * Registers a handler on a query with method POST
     *
     * @param string $path - a relative or full URL
     * @param array|callable $method - [$object, $method] or simply $method
     *
     * @return void
     */
    public function post(string $path, $method) {
        $path = $this->normalizePath($path);

        $this->postRoutes[$path] = $method;
    }

    /**
     * Registers a handler on a query with method GET
     *
     * @param string $path - a relative or full URL
     * @param array|callable $method - [$object, $method] or simply $method
     *
     * @return void
     */
    public function get(string $path, $method) {
        $path = $this->normalizePath($path);

        $this->getRoutes[$path] = $method;
    }

    /**
     * Returns a controller for current path
     *
     * @param string $url (optional) - a URL
     *
     * @return array|callable
     */
    public function getController(?string $url = null) {
        switch ($this->method) {
            case 'POST':
                $routes = $this->postRoutes;
                break;

            case 'GET':
                $routes = $this->getRoutes;
                break;
        }

        $url = $url === null ? $this->URL : $url;

        $url = $this->normalizePath($url);

        $controller = $this->findPath($routes, $url, true);

        if (!$controller) {
            $childRouter = $this->findPath($this->childRouters, $url, false);
        }

        if (!$controller) {
            if ($childRouter) {
                // $childRouter[0] contains path
                $url = substr($url, strlen($childRouter[0]));

                $url = $url === '' ? '/' : $url;

                return $childRouter[1]->getController($url);
            } else {
                $exception = \App\errors\ApiError::notFound('Route is invalid');
                throw $exception;
            }
        }

        // $controller[0] contains path, while $controller[1] contains actual controller
        return $controller[1];
    }

    /**
     * Finds controller or child router, related to given url
     *
     * @param array $routes - routes to search controller/router in
     * @param string $url - a URL
     * @param bool $strongComparison - does controller path should equal to url
     *
     * @return array - first element is path, second is controller/router
     */
    private function findPath(array $routes, string $url = '', bool $strongComparison = false) {
        $url = $url === null ? $this->URL : $url;

        foreach ($routes as $path => $method) {
	        if ($strongComparison) {
	        	if ($url === $path) {
	                return [$path, $method];
	            }
	        } else {
	        	if (strpos($url, $path) === 0) {
	                return [$path, $method];
	            }
	        }
        }

        return false;
    }

    /**
     * Returns path in normal format e.g. /path/to/resource/
     * without get params
     *
     * @param string $path - the path
     *
     * @return string - normalized path
     */
    private function normalizePath(string $path) {
        $path = str_replace('\\', '/', $path);

        if (substr($path, -1) !== '/') {
            $path .= '/';
        }

        if (substr($path, 0, 1) !== '/') {
            $path = '/' . $path;
        }

        $path = explode('?', $path)[0];

        return $path;
    }
}
