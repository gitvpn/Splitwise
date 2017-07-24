var splitgoApp = angular.module('splitgo', ['ngRoute','MainController','DirectivesController','ngResource']);

splitgoApp.config(['$resourceProvider',function($resourceProvider){
	/*If true then the trailing slashes from any calculated URL will be stripped*/
	$resourceProvider.defaults.stripTrailingSlashes = false;
	/*If true, the request made by a "non-instance" call will be cancelled 
	(if not already completed) by calling $cancelRequest() on the call's return value*/
	$resourceProvider.defaults.cancellable = false;
}]);
splitgoApp.directive('dialogBoxDirective',function(){
	return {
		restrict : 'E',
		link : function(scope,element,attributes){
			element.on('click',function(event){
				event.target.style.color = (event.target.style.color == 'white') ? 'black' : 'white';
			});
		},
		scope : {
			dialogData : '=data'
		},
		templateUrl : 'app/pages/directives/dialog-box.html'
	};
});