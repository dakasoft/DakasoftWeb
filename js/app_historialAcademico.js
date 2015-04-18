(function () { // define funcionalidad
  var app = angular.module('historialAcademico', ["ui.router"]);


  app.directive('tablaHistorial',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/reportes/tablaHistorial.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.estudiantes = [];

        $http.get('json/estudiantes.json').success(function (data) {
          $scope.estudiantes = data;
        }); 

        $http.get('php/notaconCurso.php')
          .success(function (data) {
            $scope.cursos = data;
            // console.log(data) no sirve
          })
          .error(function(data,status){
            result = data || "jiji"
        });


        
      $scope.toogleInfo = function(estado){
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