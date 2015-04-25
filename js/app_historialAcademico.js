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
        $scope.mostrandoEstudiante = estudiante;
        $http.post('php/historialEstudiante.php',{ "data" : estudiante.id }).success(function (data) {
          $scope.mostrandoEstudiante.grupos = data;
          if($scope.mostrandoEstudiante.grupos==""){
            console.log("la puta");
          }else{
            console.log($scope.mostrandoEstudiante.grupos);
            for (var i = $scope.mostrandoEstudiante.grupos.length - 1; i >= 0; i--) {
            var equipoId = $scope.mostrandoEstudiante.grupos[i].IdEquipo;
            var encargadoId = $scope.mostrandoEstudiante.grupos[i].EncargadoId;
            $scope.puntero = $scope.mostrandoEstudiante.grupos[i];
            $http.post("php/estudiantesPorEquipo.php", { "data" : equipoId})
            .success(function(data) {
              $scope.puntero.integrantes = data; // duda
             })
            $http.post("php/encargadoObtener.php", { "data" : encargadoId})
            .success(function(data) {
              $scope.puntero.Encargado = data; // duda
             })
          };           
          }


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