myApp.component('zone', {
  templateUrl: 'components/zone/zone.html',
  controller: ['$scope', 'zoneService', 'zoneByIdService', 
    function($scope, zoneService, zoneByIdService){

    console.log('zone Controller');
    
    $scope.limitOptions = [50, 100, 150];
    
    $scope.query = {
			order: 'id',
			limit: 50,
			page: 1
		};
    
    $scope.zone = zoneService;
    $scope.zoneId = zoneByIdService;

    $scope.zone.refresh().then(function(){
      $scope.count = $scope.zone.results.length;
      console.log($scope.zone.results);
    });

    $scope.showModal = function(ev, id){
      $scope.zoneId.idZone = id;
      $scope.zoneId.refresh().then(function(){
        console.log($scope.zoneId.results);
      });
    }

  }]
});