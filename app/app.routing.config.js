AppRouteConfig.$inject = ['$routeProvider'];

function AppRouteConfig($routeProvider) {
    $routeProvider
        .when('/test', {
            templateUrl: 'views/test.html',
            controller: 'TableController'
        }).otherwise({
            redirectTo: '/table'
        })
        .when('/table', {
            templateUrl: 'views/table.html',
            controller: 'TableController'
        })
        .when('/items/upload', {
            templateUrl: 'views/uploadItem.html',
            controller: 'ItemController'
        })
        .when('/items/single/:id', {
            templateUrl: 'views/singleItem.html',
            controller: 'ItemController'
        })
}

module.exports = AppRouteConfig;