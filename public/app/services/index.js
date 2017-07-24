splitgoApp
.factory('mainService',['$http','$q','$log',function($http,$q,$log){
    var service = {};
    service.login = function(details){
        return $http.post('/login',details);
    };
    service.register = function(details){
        return $http.post('/register',details);
    }
    return service;
}]);