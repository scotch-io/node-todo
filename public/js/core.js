var todo = angular.module('todo', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl 	: 'pages/home.html',
				controller 		: 'todos'
			})
			.when('/', {
				templateUrl 	: 'todos.html',
				controller 		: 'todos'
			})
			.when('/', {
				templateUrl 	: 'todos.html',
				controller 		: 'todos'
			})
			.when('/', {
				templateUrl 	: 'todos.html',
				controller 		: 'todos'
			});
		$locationProvider.html5Mode(true);
	}])
	.factory('Todo', function($resource) {
		return {
			getAllTodos : function() {
				return $resource('/api/todos').query();
			}
		}
	});

function mainController($scope, $http, $location) {
	$scope.hello = 'fuck';
}