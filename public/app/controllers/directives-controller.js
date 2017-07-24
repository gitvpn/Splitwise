angular
.module('DirectivesController',[])
.controller('dvctrl',['$log','$resource','$scope',function($log,$resource,$scope){
    $scope.dlgData1 = {
        fname : 'Harshit',
        lname : 'Srivastava'
    };
    $scope.dlgData2 = {
        fname : 'Harshit',
        lname : 'Ananda'
    };
}]);