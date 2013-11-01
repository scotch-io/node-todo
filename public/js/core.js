var todo = angular.module('todo', [])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl 	: '../../app/views/pages/home.html',
				controller 		: 'todos'
			});
	});

function mainController($scope, $http, $location) {
	$scope.hello = 'fuck';
}

function todos($scope, $http, $location) {

}