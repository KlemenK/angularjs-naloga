'use strict';

angular.module('myApp.view_edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view_edit', {
		templateUrl: 'view_edit/view_edit.html',
		controller: 'EditDataController'
	});
}])
.factory('myFactoryEdit', function($http)
{
	var factory={};

	factory.getZaposleniNaProjektu= function(idprojekt){
		var zapos=[]

		$http.post('http://localhost:3000/loadZaposleniNaProjektu',{id:idprojekt})
		.success(function(data,status,headers,config){
			for (var i = 0; i<data.length; i++) {
				zapos.push(
				{
					id: data[i].idzaposleni,
					ime: data[i].Ime,
					priimek: data[i].Priimek,
				});
			};
				//alert(JSON.stringify(zapos));
			})
		.error(function(data,status,headers,config){
		});

		return zapos;
	};

	factory.getZaposleni= function(){
		var zapos=[];

		$http.get('http://localhost:3000/loadZaposleni').success(function(data,status){
			//	alert(""+data[0].Ime+" "+data[0].Priimek);
			for (var i = 0; i<data.length; i++) {
				zapos.push(
				{
					id: data[i].idzaposleni,
					ime: data[i].Ime,
					priimek: data[i].Priimek
				});
			};
		})
		.error(function(data,status,headers,config){
		});

		return zapos;
	};

	factory.getTaskiNaProjektu= function(idprojekt){
		
		var taski=[];
		$http.post('http://localhost:3000/loadProstiTaskiNaProjektu',{id:idprojekt})
		.success(function(data,status,headers,config){
			//var taski=[];
			for (var i = 0; i<data.length; i++) {
				taski.push(
				{
					id: data[i].idtask,
					naziv: data[i].Naziv,
					casIzvedbe: data[i].Cas_izvedbe,
					prioriteta: data[i].Prioriteta,
					opis: data[i].Opis
				});

			};
		})
		.error(function(data,status,headers,config){
		});
		
		return taski;
	};

	factory.addZapNaProjekt= function(data){
		return $http.post('http://localhost:3000/addZapNaProjekt',data)
		.success(function(data,status,headers,config){
			return true;
		})
		.error(function(data,status,headers,config){
			return false;
		});
	};

	factory.odstraniZapIzProject= function(idprojekt,idzaposleni){
		return $http.post('http://localhost:3000/odstraniZapIzProject',{idprojekt:idprojekt, idzaposleni:idzaposleni})
		.success(function(data,status,headers,config){
			return true;
		})
		.error(function(data,status,headers,config){
			return false;
		});
	};
	factory.getProjektNaziv = function (id) {
		var naziv="dsf";
		$http.post('http://localhost:3000/getProjektNaziv',{id:id})
		.success(function(data,status,headers,config){
			naziv=data[0].Naziv;
			return naziv;
		})
		.error(function(data,status,headers,config){
			alert(data+"..."+status);
		});
		
	};


	return factory;

})
.controller('EditDataController', function($scope, $routeParams, myFactoryEdit, $location)
{
	$scope.zaposleniNaProjektu=[];
	$scope.zaposleni=[];
	$scope.taskiNaProjektu=[];
	$scope.projektNaziv="";
	$scope.izbraniTaski=[];

	init();
	function init(){
		$scope.projektID=$routeParams.id;
		
		$scope.projektNaziv=myFactoryEdit.getProjektNaziv($scope.projektID);
		$scope.zaposleni=myFactoryEdit.getZaposleni();
		$scope.zaposleniNaProjektu=myFactoryEdit.getZaposleniNaProjektu($scope.projektID);
		$scope.taskiNaProjektu=myFactoryEdit.getTaskiNaProjektu($scope.projektID);
	};
	$scope.dodajZapNaProjekt=function(id){
		if(typeof id != "undefined" && id != null){
			if (typeof $scope.izbraniTaski != "undefined" && $scope.izbraniTaski != null && $scope.izbraniTaski.length > 0) {
				var x={
					idprojekt:$scope.projektID, 
					idzaposleni:id, 
					taski: $scope.izbraniTaski
					};
				if (myFactoryEdit.addZapNaProjekt(x)){
					for (var i = 0; i < $scope.zaposleni.length; i++) {

						if($scope.zaposleni[i].id == id){ 
								$scope.zaposleniNaProjektu.push({
									id: $scope.zaposleni[i].id,
									ime: $scope.zaposleni[i].ime,
									priimek: $scope.zaposleni[i].priimek
								});
							} 
					};
				 	$scope.izbraniTaski=[];
				}else alert("Napaka pri dodajanju");
			} else alert("Potrebno je izbrati vsaj en task");
		}else alert("Potrebno je izbrati zaposlenega");

	};
	$scope.odstraniZapIzProjekt=function(id){
		if (myFactoryEdit.odstraniZapIzProject($scope.projektID,id)){
			for (var i = 0; i < $scope.zaposleniNaProjektu.length; i++) {
				if($scope.zaposleniNaProjektu[i].id == id) $scope.zaposleniNaProjektu.splice(i, 1);
			};
		}
		else alert("Napaka pri odstranjevanju");
	};

	$scope.dodajTaskZaposlenemu=function(task){		
		for (var i = 0; i < $scope.taskiNaProjektu.length; i++) {
			if ($scope.taskiNaProjektu[i].id == task.id) $scope.taskiNaProjektu.splice(i, 1);
		};
		$scope.izbraniTaski.push(task);	
	};
	$scope.odstraniOdIzbrani=function(task){		
		for (var i = 0; i < $scope.izbraniTaski.length; i++) {
			if ($scope.izbraniTaski[i].id == task.id){
				$scope.izbraniTaski.splice(i, 1);
			} 
		};
		$scope.taskiNaProjektu.push({
			id: task.id,
			naziv: task.naziv,
			casIzvedbe: task.casIzvedbe,
			prioriteta: task.prioriteta,
			opis: task.opis
		});	
	};
	$scope.createTask=function(){
		$location.path('view_add_task/'+$scope.projektID);
	};
	$scope.urediTaske=function(id,ime,priimek){
	    $location.path("view_edit_zap_task/"+$scope.projektID+"/"+id+"/"+ime+" "+priimek);
	};
		


});
