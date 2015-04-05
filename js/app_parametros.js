(function () { // define funcionalidad
  var app = angular.module('parametros', ["ui.router"]);

  app.directive('parametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/parametrosP.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.votaciones = [];
        $scope.votacion = funciones.votacion();

        $http.get('json/votaciones.json').success(function (data) {
          $scope.votaciones = data;
        }); 

        $scope.editar = function(votacion){
          $scope.votacion =  angular.copy(votacion);
          //anno,mes,dia
          $scope.votacion.fechaProyectos
          $scope.votacion.fechaProyectos = new Date(2014, 3, 12);
          console.log($scope.votacion.fechaProyectos);
          $scope.accion = "Editar";
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.votacion = funciones.votacion();
          $scope.accion = "Nuevo"
        };

        $scope.guardar = function() {
          
        };
      }]
    };
  });

  app.directive('modalParametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/modalParametros.html'
    };
  });


})();