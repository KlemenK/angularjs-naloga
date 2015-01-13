'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.factory('myFactory1', function($http, $rootScope)
{
	var factory={};

	factory.getZaposleni= function(){
		var zapos=[]

		$http.get('http://localhost:3000/loadZaposleni').success(function(data,status){
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

	factory.addZaposleni = function (zaposleni) {
		alert("dodajam zaposlenega \n"+zaposleni.Ime+" "+zaposleni.Priimek);

		$http.post('http://localhost:3000/dodajZaposleni',zaposleni)
		.success(function(data,status,headers,config){
			alert("Dodan");
					$rootScope.zaposleni.push({
						id:data.insertId,
						ime:zaposleni.Ime,
						priimek:zaposleni.Priimek
					});
		})
		.error(function(data,status,headers,config){
			alert(data+"..."+status);
		});
		
	};


return factory;

})

.controller('View2Ctrl', function($scope,$rootScope, myFactory1) 
{
	$rootScope.zaposleni=[];
	init();

	function init(){
		$rootScope.zaposleni=myFactory1.getZaposleni();
	};

	$scope.addZaposleni=function(){
		myFactory1.addZaposleni($scope.novZaposleni);
	}

});