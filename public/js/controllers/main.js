angular.module('todoController', [])

  // inject the Todo service factory into our controller
  .controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
    $scope.formData = {};
    $scope.loading = true;
    $scope.editable=[];

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
        for(var iter=0; iter<data.length; iter++){
          $scope.editable[iter]=false;
        }
        $scope.loading = false;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

      // validate the formData to make sure that something is there
      // if form is empty, nothing will happen
      if ($scope.formData.text != undefined) {
        $scope.loading = true;

        // call the create function from our service (returns a promise object)
        Todos.create($scope.formData)

          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.loading = false;
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data; // assign our new list of todos
          });
      }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
      $scope.loading = true;

      Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
        .success(function(data) {
          $scope.loading = false;
          $scope.todos = data; // assign our new list of todos
        });
    };

    $scope.makeEditable = function(id) {
      if(!$scope.editable[id])
        $scope.editable[id]=true;
    };

    $scope.saveEdited = function(id, todoId, todoText) {
      var todoData={todoId:todoId, todoText:todoText};
      $scope.loading=true;
      Todos.edit(todoData)
        .success(function(data){
          $scope.loading=false;
          if($scope.editable[id])
            $scope.editable[id]=false;
        });
    };

  }]);