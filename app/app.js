'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view_edit',
  'myApp.view_edit_zap_task',
  'myApp.view_add_task',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/view_edit', {redirectTo: '/view1'
  })
  .when('/view_add_task', {redirectTo: '/view1'
  })
  .when('/view_edit_zap_task', {redirectTo: '/view1'
  })
  .when('/view_edit/:id', {
    templateUrl: 'view_edit/view_edit.html',
    controller: 'EditDataController'
  })
  .when('/view_add_task/:id', {
    templateUrl: 'view_add_task/view_add_task.html',
    controller: 'AddTaskController'
  })
  .when('/view_edit_zap_task/:idprojekt/:idzaposleni/:ImePriimek', {
    templateUrl: 'view_edit_zap_task/view_edit_zap_task.html',
    controller: 'EditZapTaskDataController'
  })
  .otherwise({redirectTo: '/view1'});
}]);
