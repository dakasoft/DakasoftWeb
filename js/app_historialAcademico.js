(function () { // define funcionalidad
  var app = angular.module('historialAcademico', ["ui.router"]);


  app.directive('tablaHistorial',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/reportes/tablaHistorial.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.estudiantes = [];

        $http.get('php/estudiantesConGrupoListar.php').success(function (data) {
          $scope.estudiantes = data;
        }); 

      $scope.toogleInfo = function(estado,estudiante){
        console.log("esa");
        $scope.mostrandoEstudiante = estudiante;
        $http.post('php/historialEstudiante.php',{ "data" : estudiante.id }).success(function (data) {
          console.log(data);
          $scope.mostrandoEstudiante.grupos = data;
        });
      
        if(estado)
        {
          return false;
        }
        return true;
      }

      }]
      }
    });

})();