'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ui.router', 'ui.bootstrap', 'ngMaterial', 'md.data.table', 'ngAnimate', 'ngMessages'
])

.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $urlRouterProvider.when('/', 'login');
  
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
  
    .state('menu', {
      url: '/menu',
      template: '<menu></menu>'
    })

    .state('menu.building', {
      url: '/building',
      template: '<building></building>'
    })

    .state('menu.loadBuilding', {
      url: '/loadBuilding',
      template: '<loadBuilding></loadBuilding>'
    })    

    .state('menu.editBuilding', {
      url: '/editBuilding/{idBuilding}',
      template: '<editBuilding></editBuilding>'
    })  

    .state('menu.agents', {
      url: '/agents',
      template: '<agents></agents>'
    })

    .state('menu.loadAgents', {
      url: '/loadAgents',
      template: '<loadAgents></loadAgents>'
    })    
    
    .state('menu.zone', {
      url: '/zone',
      template: '<zone></zone>'
    })
    
    .state('menu.loadZone', {
      url: '/loadZone',
      template: '<loadZone></loadZone>'
    });
}])

.run(['$state', '$http', 'AuthService', 
  function ($state, $http, auth){
  /*$http.defaults.headers.common['Content-Type'] = 'application/json'
  $http.defaults.headers.common['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNDkyNzAyODQzLCJleHAiOjE0OTI3MDY0NDMsIm5iZiI6MTQ5MjcwMjg0MywianRpIjoiRGZmc1piejRMRnBVakszTCJ9.63UNLBYp4iRF0NQ0kZ2wD5wNli2ZuJGj9AfAlrBNvoQ";
	console.log(auth);*/
  }
]);
