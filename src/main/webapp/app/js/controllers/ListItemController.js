angular.module("venteEnLigne")

.controller("ListItemController",function($http,ItemService,$location,$scope,BasketService){
	var ctrl = this;
	var setProd = new Set();
	
	$scope.items = [];
	$scope.products = []

	$scope.alerts = [];

	$scope.minQuantity = 1;
	$scope.maxQuantity = 10000;

	$scope.currentColumn = 'name';
	$scope.reverse = false;

	ItemService.getItems().then(
			function(response) {
				var items = response.data;
				for(var i=0; i<items.length; i++) {
					$scope.items.push({name:items[i].name, nameProduct:items[i].nameProduct, entity: items[i], quantity: 1});
					setProd.add(items[i].nameProduct);
				}
				setProd.forEach(function(value){$scope.products.push(value)})
			},
			function(error) {
				addAlert({type: "danger", msg:"Connection error"});
			}
	);

	$scope.showItem = function(item) {
		ItemService.showItem(item)
	};


	$scope.addItemToBasket = function (item) {

		itemSave={
				entity: item.entity, quantity: item.quantity
		}

		var result = BasketService.addItemToBasket(itemSave);
		if(result.error) {
			addAlert({type: "danger", msg: result.error});
		} else {
			addAlert({type: 'success', msg: item.quantity + ' ' + item.entity.name + ' added to basket !'});
		}
	};

	function addAlert(params) {
		$scope.alerts.push(params);
		if($scope.alerts.length > 3) {
			$scope.alerts.shift();
		}
	}

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.decrementQuantity = function(item) {
		if(item.quantity > $scope.minQuantity) {
			item.quantity--;
		}
	};

	$scope.incrementQuantity = function(item) {
		if(item.quantity < $scope.maxQuantity) {
			item.quantity++;
		}
	};

	$scope.getIcon = function(column) {

		if ($scope.currentColumn == column) {
			return $scope.reverse ? 'glyphicon-chevron-down' : 'glyphicon-chevron-up';
		}
		return 'glyphicon-star';
	}
});
