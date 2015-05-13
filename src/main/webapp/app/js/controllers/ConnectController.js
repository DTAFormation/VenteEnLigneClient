angular.module("venteEnLigne").controller("ConnectController", function(ConnectService, BasketService, ModalService, $scope, $location, $rootScope) {
	$scope.logins = {};
	$scope.inError = false;

	$scope.connect = function() {
		if($scope.connectForm.$valid) {
			ConnectService.connect($scope.logins).then(
				function(response) {
					ConnectService.setConnected($scope.logins.usr);
					ModalService.openModal(
						"Logged in",
						"Welcome " + $scope.logins.usr,
						"OK"
					).result.then(
							redirection,
							redirection
					);
				},
				function(error) {
					$scope.inError = true;
				}
			);
		}
	};

	function backToLastPage() {
		$location.path($rootScope.lastPage || "/");
	}
	
	function redirection() {
		if(BasketService.getBasket().toString()==[]) {
			$location.path($rootScope.lastPage || "/");
		}
		else {
			$location.path("/validatePayment");
		}
	}
	
	$scope.goToSignUp = function() {
		$location.path("/signup");
	};
	
	function goToPurchase() {
		$location.path("/validatePayment");
	};
	

});