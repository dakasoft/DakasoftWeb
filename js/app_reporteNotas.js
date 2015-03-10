(function () { // define funcionalidad
  var app = angular.module('reporteNotas', ["ui.router"]);


  app.directive('tablaNotas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/reporteNotasTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.estudiantes = [];

        $http.get('json/estudiantes.json').success(function (data) {
          $scope.estudiantes = data;
          console.log(data);
        }); 
      }],
      controllerAs: 'modalCntrl'
      }
    });

})();