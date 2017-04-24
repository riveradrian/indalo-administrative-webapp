myApp.component('menu', {
  templateUrl: 'components/menu/menu.html',
  controller: ['$scope', 'AuthService', function($scope, auth){
console.log(auth);
    $scope.logout = function() {
			auth.logout();
			$state.go('login');
		};    

  }]
});