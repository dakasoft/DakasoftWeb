(function () { // define funcionalidad
  var app = angular.module('reporte', ["ui.router"]);


  app.directive('tablaReporteNotas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/reportes/tablaNotas.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.reportes = [];

          $http.get('php/reporteNotas.php')
          .success(function (data) {
            console.log(data);
            $scope.reportes = data;;
          })
          .error(function(data,status){
            result = data || "jiji"
          });
      }]
      }
    });

})();