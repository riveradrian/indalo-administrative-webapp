myApp.component('loadbuilding', {
  templateUrl: 'components/building/loadBuilding.html',
  controller: ['$scope', 'zoneService', function($scope, zoneService){
    console.log('loadBuilding Controller');
    
    $scope.zone = zoneService;
    
    $scope.zone.refresh().then(function(){
      console.log($scope.zone.results);
    });

    $scope.oneAtATime = true;

    $scope.status = {
      isCustomHeaderOpen: false,
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }]
});