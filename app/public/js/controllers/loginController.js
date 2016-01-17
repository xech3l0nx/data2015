angular.module('esame')
.controller('loginCtrl', ['$scope', '$http','$facebook','$location','Session', function($scope, $http, $facebook, $location,Session){


	$scope.controllerName = "loginCtrl";
	$scope.titles = "login";

	$scope.login = function() {
		$facebook.login().then(function(resp) {
			if(resp.status === "connected") {
				Session.init(resp);				
				$location.path('/home');
			} else {
				$scope.error = "There was an error connecting to your facebook account";
			}			
		}, function(error){
			console.log(error)
			alert("An error occurred contacting the server");
			$location.path('/login');
		});
	};

	$scope.logout = function() {
		$facebook.logout().then(function(){
			Session.destroy();
			//fare il refresh dell' applicazione
			$location.path('/');
			//navbar non viene ricaricata
			$scope.user = null;
		});
	};	
	
}]);



