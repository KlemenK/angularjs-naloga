'use strict';

angular.module('myApp.view_edit_zap_task', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view_edit_zap_task', {
    templateUrl: 'view_edit/view_edit_zap_task.html',
    controller: 'EditZapTaskDataController'
  });
}])
.factory('myFactoryEditZapTask', function($http)
{
	var factory={};

	factory.getTaskiOdZaposlenegaNaProjektu= function(idprojekt,idzaposleni){
		var zapTaski=[];

		$http.post('http://localhost:3000/loadTaskiZaposlenegaNaProjektu',{idprojekt:idprojekt,idzaposleni:idzaposleni})
			.success(function(data,status,headers,config){
				for (var i = 0; i<data.length; i++) {
					zapTaski.push(
					{
						id: data[i].idtask,
						naziv: data[i].Naziv,
						opis: data[i].Opis,
						prioriteta: data[i].Prioriteta,
						casIzvedbe: data[i].Cas_izvedbe,
						idzaposleni: idzaposleni
					});
				};
				//alert(JSON.stringify(zapos));
			})
			.error(function(data,status,headers,config){
			});

		return zapTaski;
	};

	factory.getProstiTaskiNaProjektu= function(idprojekt){
		var zapTaski1=[];

		$http.post('http://localhost:3000/loadProstiTaskiNaProjektu',{id:idprojekt})
			.success(function(data,status,headers,config){
				for (var i = 0; i<data.length; i++) {
					zapTaski1.push(
					{
						id: data[i].idtask,
						naziv: data[i].Naziv,
						opis: data[i].Opis,
						prioriteta: data[i].Prioriteta,
						casIzvedbe: data[i].Cas_izvedbe,
						idzaposleni: null
					});
				};
				//alert(JSON.stringify(zapos));
			})
			.error(function(data,status,headers,config){
			});

	factory.potrdiSpremembe= function(data){
		$http.post('http://localhost:3000/potrdiSpremembe',data)
		.success(function(data,status,headers,config){
			alert("Spremembe potrjene");
			return true;
		})
		.error(function(data,status,headers,config){
			return false;
		});
	};

		return zapTaski1;
};

return factory;

})
.controller('EditZapTaskDataController', function($scope, $routeParams,$location, myFactoryEditZapTask)
{
	$scope.taskiZaposlenega=[];
	$scope.prostiTaski=[];

	init();
	function init(){
		$scope.projektID=$routeParams.idprojekt;
		$scope.zaposleniID=$routeParams.idzaposleni;
		$scope.zaposleniImePriimek=$routeParams.ImePriimek;
		$scope.taskiZaposlenega=myFactoryEditZapTask.getTaskiOdZaposlenegaNaProjektu($scope.projektID, $scope.zaposleniID);
		$scope.prostiTaski=myFactoryEditZapTask.getProstiTaskiNaProjektu($scope.projektID);
	};
	$scope.dodajTaskZaposlenemu=function(task,t1,t2){
		for (var i = 0; i < t2.length; i++) {
				if (t2[i].id == task.id){
					t2.splice(i, 1);
				} 
			};
			t1.push({
				id: task.id,
				naziv: task.naziv,
				casIzvedbe: task.casIzvedbe,
				prioriteta: task.prioriteta,
				opis: task.opis,
			});
			$scope.taskiZaposlenega=t1;
			$scope.prostiTaski=t2;
	};
	$scope.odstraniTaskZaposlenemu=function(task,t1,t2){
		for (var i = 0; i < t1.length; i++) {
				if (t1[i].id == task.id){
					t1.splice(i, 1);
				} 
			};
			t2.push({
				id: task.id,
				naziv: task.naziv,
				casIzvedbe: task.casIzvedbe,
				prioriteta: task.prioriteta,
				opis: task.opis,
			});
			$scope.taskiZaposlenega=t1;
			$scope.prostiTaski=t2;
	};
	$scope.potrdiSpremembe=function(t1,t2){
		var taski=[];

		for (var i = 0; i < t1.length; i++) {
			taski.push({
				idtask:t1[i].id,
				idzap:$scope.zaposleniID
			});
		};
		for (var i = 0; i < t2.length; i++) {
			taski.push({
				idtask:t2[i].id,
				idzap:null
			});
		};
		myFactoryEditZapTask.potrdiSpremembe({taski:taski,idprojekt:$scope.projektID});
	};
	$scope.nazaj=function(){
		$location.path('view_edit/'+$scope.projektID);
	}

});

