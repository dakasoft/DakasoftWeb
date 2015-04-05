(function () { // define funcionalidad
  var app = angular.module('parametros', ["ui.router"]);

     app.directive('parametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/parametrosP.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams,funciones) {
      $scope.parametros = [];
      $scope.votacion = funciones.votacion();

      $http.get('json/parametros.json').success(function (data) {
        $scope.parametros = data;
      }); 
       
   $scope.editar = function(parametro){
          $scope.editableC = parametro;
          $scope.FechaProyectos = parametro.FechaProyectos;
          $scope.FechaCierre = parametro.FechaCierre;
        };

 $scope.guardar = function() {
          
  };
      }],
      controllerAs: 'parametros'
    };
  });
  app.directive('modalParametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/modalParametros.html',
      controller: ['$scope','$http',function ($scope,$http) {
       
        
      }],
        controllerAs: 'modalParametros'
    };
});


})();