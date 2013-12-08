var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.factory('todoFactory', function($http) {
	return {
		get : function() {
			return $http.get('/api/todos');
		},
		create : function() {
			$http.post('/api/todos', $scope.formData);
		},
		delete : function() {

		}
	}
});

function mainController($scope, $http, todoFactory) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	todoFactory.get()
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		
			.success(function(data) {
				$('input').val('');
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}