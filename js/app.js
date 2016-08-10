angular.module('clientsApp', []);
angular.module('clientsApp').controller('ClientsCtrl', function($scope) {
	$scope.clients = [
	];
	$scope.priceIsRequired = true;

	$scope.isApplied = false;

	$scope.percentageOf = function(price) {
		var  whole = (price-(price / 100 )),result = {
				'integer':Math.floor(whole) ,
				'fractional':whole % 1};
		return result;
	};

	$scope.calc_sale = function () {
		var acc = 0;
		$scope.clients.forEach(function (client){
			acc += client.price - client.endPriceParts.integer;
		});
		return acc;
	};

	$scope.wholeSale = 0;

	$scope.create = function() {
		console.log(1);
		$scope.newClient.id = $scope.clients.length + 1;
		$scope.newClient['endPriceParts'] = $scope.percentageOf($scope.newClient.price);
		$scope.clients.push($scope.newClient);
		$scope.wholeSale = $scope.calc_sale();
		$scope.newClient = null;
	};


	$scope.apply = function() {
		var residual = 0;
		$scope.clients.forEach(function (client){
			residual += client.endPriceParts.fractional;
		});
		var productWithMaxPrice=_.maxBy($scope.clients, 'endPriceParts.integer');
		productWithMaxPrice.endPriceParts.integer -=  Math.round(residual);
		$scope.isApplied = true;
	};


});