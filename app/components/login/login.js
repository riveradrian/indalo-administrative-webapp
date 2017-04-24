myApp.component('login', {
  templateUrl: 'components/login/login.html',
  controller: ['$scope', 'AuthService', function($scope, auth){
   
    console.log('login Controller');
    $scope.auth = auth;
    
  }]
});