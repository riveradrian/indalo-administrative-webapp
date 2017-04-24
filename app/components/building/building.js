myApp.component('building', {
  templateUrl: 'components/building/building.html',
  controller: ['$scope', '$mdDialog', 'buildingService', 'buildingByIdService',
    function($scope, $mdDialog, buildingService, buildingByIdService){

    console.log('building Controller');

    $scope.limitOptions = [50, 100, 150];
    
    $scope.query = {
			order: 'descripcion',
			limit: 50,
			page: 1
		};
    
    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/building/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }



    $scope.building = buildingService;
    $scope.buildingId = buildingByIdService;

    $scope.building.refresh().then(function(){
      $scope.count = $scope.building.results.length;
      console.log($scope.building.results);
    });
    
    $scope.showModal = function(ev, id){
      $scope.buildingId.idBuilding = id;
      $scope.buildingId.refresh().then(function(){
        console.log($scope.buildingId.results);
      });
    }

  }]
});