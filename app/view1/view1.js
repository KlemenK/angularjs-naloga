'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl: 'view1/view1.html',
		controller: 'DataSourceController'
	});
}])

.factory('myFactory', function($http, $rootScope)
{
	var factory={};
	factory.getProjects= function(){
		var proj=[]

		$http.get('http://localhost:3000/loadProjekti').success(function(data,status){
				for (var i = 0; i<data.length; i++) {
					proj.push(
					{
						id: data[i].idprojekt,
						naziv: data[i].Naziv,
						avtor: data[i].Avtor
					});
				};
			})
		.error(function(data,status,headers,config){
		});
		return proj;
	};

	factory.addProject = function (project) {
		alert("dodajam projekt \n"+project.naziv);
		$http.post('http://localhost:3000/dodajProjekt',project)
			.success(function(data,status,headers,config){
				alert("Dodan");
					$rootScope.projekti.push({
						id:data.insertId,
						naziv:project.naziv,
						avtor:project.avtor
					});

			})
			.error(function(data,status,headers,config){
				alert(data+"..."+status);
			});
		
	};

	factory.odstraniProjekt = function(id){
		$http.post('http://localhost:3000/odstraniProjekt',{id:id})
			.success(function(data,status,headers,config){
				for (var i = 0; i < $rootScope.projekti.length; i++) {
					if($rootScope.projekti[i].id == id) $rootScope.projekti.splice(i, 1);
				};
				alert("izbrisan");

			})
			.error(function(data,status,headers,config){
				alert(data+"..."+status);
			});
	};



return factory;

})


.controller('DataSourceController', function($scope,$rootScope,myFactory,$location)
{
	$rootScope.projekti=[];
	init();


	function init(){
		$rootScope.projekti= myFactory.getProjects();
	};

	$scope.addProjekt=function(){
		myFactory.addProject($scope.novProjekt);
	};

	$scope.odstraniProjekt=function(id){
		myFactory.odstraniProjekt(id);

	};
	

	$scope.urediProjekt = function(id){
		$location.path('view_edit/'+id);
	}
});

