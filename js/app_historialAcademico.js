(function () { // define funcionalidad
  var app = angular.module('historialAcademico', ["ui.router"]);


  app.directive('tablaHistorial',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/historialTabla.html',
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