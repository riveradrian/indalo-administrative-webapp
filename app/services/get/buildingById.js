myApp.service("buildingByIdService", function($q, $http, $timeout) {
    var self = {
        'idBuilding': "",
        'isLoading': false,
        'hasMore': true,
        'results': [],
        'refresh': function() {
            self.isLoading = false;
            self.hasMore = true;
            self.results = [];
            return self.load();
        },
        'load': function() {
            self.isLoading = true;
            var deferred = $q.defer();
            $http.get('http://indaloasesores.com/inmobiliaria/publicacion/' + self.idBuilding)
                .then(function(data) {
                    self.results = data.data;
                    self.isLoading = false;
                    deferred.resolve();
                }, function(data, status, headers, config) {
                    self.isLoading = false;
                    deferred.reject(data);
                });
            return deferred.promise;
        },
    };
    return self;
});