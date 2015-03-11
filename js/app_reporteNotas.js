(function () { // define funcionalidad
  var app = angular.module('reporte', ["ui.router"]);


  app.directive('tablaReporteNotas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/tablaReporteNotas.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.reportes = [];

        $http.get('json/reporteNotas.json').success(function (data) {
          $scope.reportes = data;
        }); 
      }],
      controllerAs: 'modalCntrl'
      }
    });

})();