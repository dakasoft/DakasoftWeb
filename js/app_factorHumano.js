(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('rubricaFactorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricaFactorHumano.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.carrera = [];
      
        $http.get('json/carreras.json').success(function (data) {
          $scope.carreras = data;

        });
        
        

        
        };
      }],
      controllerAs: 'carreras'
    };
  });

    app.directive('modalc',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalCarreras.html',
      controller: ['$scope','$http',function ($scope,$http) {
       
        
      }],
        controllerAs: 'modalC'
    };
});


})();