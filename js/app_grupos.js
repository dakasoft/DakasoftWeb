(function () { // define funcionalidad
  var app = angular.module('grupos', ["ui.router"]);

  app.directive('gruposTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/gruposTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.grupos = [];
        $scope.cursos = [];
        
        $http.get('json/grupos.json').success(function (data) {
          $scope.grupos = data;
        });

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });

        $scope.editar = function(grupo){
 
        };

        $scope.borrar = function(user){

        };

        $scope.agregar = function(){
   
        };

        $scope.guardar = function(){
         $("#nuevoGrupoModal").modal('hide');
        };
      }],
      controllerAs: 'grupoCntrl'
    };
  });

  app.directive('modalGrupo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalNuevoGrupo.html',
      controller: ['$scope','$http',function ($scope,$http) {
        /*
        $scope.roles = [{id:'1', label:'Admin'},{id:'2', label:'Decano'},
          {id:'3', label:'Director académico'},{id:'4', label:'Profesor'},
          {id:'5', label:'Estudiante'}
        ];*/

      }],
      controllerAs: 'modalGrupoCntrl'
    };
  });

})();