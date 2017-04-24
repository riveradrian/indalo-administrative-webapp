myApp.component('editbuilding', {
  templateUrl: 'components/building/editBuilding.html',
  controller: ['$scope', '$stateParams', 'buildingByIdService', 
    function($scope, $stateParams, buildingByIdService){
    
    console.log('editBuilding Controller');

    $scope.buildingId = buildingByIdService;
    $scope.buildingId.idBuilding = $stateParams.idBuilding;
    
    $scope.buildingId.refresh().then(function(){
      console.log($scope.buildingId.results);
      console.log($scope.buildingId.results[0].cocina_empotrada);
    });

    $scope.oneAtATime = true;

    $scope.status = {
      isCustomHeaderOpen: false,
      isFirstOpen: true,
      isFirstDisabled: false
    };    

  }]
});