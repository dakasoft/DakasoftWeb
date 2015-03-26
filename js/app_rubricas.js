(function () { // define funcionalidad
  var app = angular.module('rubricasfh', ["ui.router"]);

  app.directive('rubricasFactorH',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricasFactorH.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.factorHumano = [];
      
      
        $http.get('json/rubricaFH.json').success(function (data) {
          $scope.factorHumano = data;
        });

        

        





        
      }],
      controllerAs: 'factorH'
    };
  });



     
  



})();