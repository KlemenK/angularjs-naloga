'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.factory('myFactory1', function($http)
{
	var factory={};

	factory.getZaposleni= function(){
		var zapos=[]

		$http.get('http://localhost:3000/loadZaposleni').success(function(data,status){
				alert(""+data[0].Ime+" "+data[0].Priimek);
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
			alert("ok");
		})
		.error(function(data,status,headers,config){
			alert(data+"..."+status);
		});
		
	};


return factory;

})

.controller('View2Ctrl', function($scope, myFactory1) 
{
	$scope.zaposleni=[];
	init();

	function init(){
		$scope.zaposleni=myFactory1.getZaposleni();
	};

	$scope.addZaposleni=function(){
		myFactory1.addZaposleni($scope.novZaposleni);

	}

});