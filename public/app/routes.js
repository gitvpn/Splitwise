
splitgoApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'app/pages/home.html',
            controller  : 'mainctrl as mc'
        })
        .when('/register', {
            templateUrl : 'app/pages/registration.html',
            controller  : 'mainctrl as mc'
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'app/pages/about.html',
            controller  : 'mainctrl'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'app/pages/contact.html',
            controller  : 'mainctrl'
        })
        .when('/directives',{
            templateUrl : 'app/pages/directives/directives.html',
            controller  : 'dvctrl as dc'
        });
});