myApp.component('agents', {
  templateUrl: 'components/agents/agents.html',
  controller: ['$scope', function($scope){
    var randomName = faker.name.findName();    
    console.log('agents Controller');
  }]
});