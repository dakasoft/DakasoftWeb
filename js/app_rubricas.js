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

  // ModalDialog
 app.directive('modalRubricas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalRubricas.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalFactorRubricas'
    };
});


     
  



})();