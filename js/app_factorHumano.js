(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('factorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricaFactorHumano.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.carrera = [];
      
        // $http.get('json/carreras.json').success(function (data) {
        //   $scope.carreras = data;

        // });
        
        

        
       
      }],
      controllerAs: 'carreras'
    };
  });

   
       
  



})();