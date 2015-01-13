'use strict';

angular.module('myApp.view_add_task', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view_add_task', {
    templateUrl: 'view_add_task/view_add_task.html',
    controller: 'AddTaskController'
  });
}])
.factory('addTaskFactory', function($http)
{
	var factory={};

	factory.createTask= function(data){


		$http.post('http://localhost:3000/createTask',data)
			.success(function(data,status,headers,config){
				alert("Task ustvarjen");
			})
			.error(function(data,status,headers,config){
			});
	};

return factory;

})
.controller('AddTaskController', function($scope, $routeParams,$location, addTaskFactory)
{
	$scope.options = [
	    { label: '1', value: 1 },
	    { label: '2', value: 2 },
	    { label: '3', value: 3 },
	    { label: '4', value: 4 },
	    { label: '5', value: 5 }
  	];

	init();
	function init(){
		$scope.projektID=$routeParams.id;

	};
	$scope.createTask=function(){
		$scope.novTask.prioriteta=$scope.selectedItem.value;
		$scope.novTask.idprojekt=$scope.projektID;
		if (typeof $scope.novTask.naziv != "undefined" && $scope.novTask.naziv != null) {
			if (typeof $scope.novTask.prioriteta != "undefined" && $scope.novTask.prioriteta != null) {
				addTaskFactory.createTask($scope.novTask);
			}else{
				alert("Manjka prioriteta");
			}
		}else{
			alert("Manjka naziv");
		}
	};

	$scope.nazaj=function(){
		$location.path('view_edit/'+$scope.projektID);
	};

});

