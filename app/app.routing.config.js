AppRouteConfig.$inject = ['$routeProvider'];

function AppRouteConfig($routeProvider) {
    $routeProvider
        .when('', {
            template: '<p>asdf</p>'
        })
        .when('/test', {
            templateUrl: 'views/test.html',
            controller: 'TableController'
        }).otherwise({
            redirectTo: '/landing'
        })
        .when('/landing', {
            templateUrl: 'views/test.html',
            controller: 'TableController'
        })
}

module.exports = AppRouteConfig;