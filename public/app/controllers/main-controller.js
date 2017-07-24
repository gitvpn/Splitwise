angular
.module('MainController',[])
.controller('mainctrl',['$log','$scope','$location','$http','mainService','$resource',function($log,$scope,$location,$http,mainService,$resource){
    var self = this;
    if($location.url() == '/'){
        self.loginModel = {};
    }
    if($location.url() == '/register'){
        self.regModel = {};
    }
    (function(){
        function changeGender(userObject){
            userObject.gender = (userObject.gender === 'M') ? 'F' : 'M';
            /** You can also access the raw $http promise via 
             * the $promise property on the object returned */
            USER_RESOURCE.save(userObject).$promise.then(
                function(response){
                    $log.debug(response);
                },
                function(error){
                    $log.error(error);
                }
            );    
        }
        /** create a resource object */
        var USER_RESOURCE = $resource('/users/:userId',{userId : '@_id'});
        /** fetch objects */
        var users = USER_RESOURCE.query(function(){
            var user = users[0]; //take the first record
            user.name = user.name.concat(' Srivastava');
            /** update the record. id of the user will be taken from _id property.
             * because of the '@_id'
             */
            user.$save(function(responseData,responseHeaders){
                console.log();
            }); 
            changeGender(user);
        });
        
    })();
        
    self.doLogin = function(){
        mainService.login(self.loginModel).then(
            function(response){
                console.log(response);
            },
            function(error){
                console.log();
            }
        );
    };
    self.doRegistration = function(){
        
        mainService.register(self.regModel).then(
            function(response){
                console.log(response);
            },
            function(error){
                console.log();
            }
        );
    }
}]);