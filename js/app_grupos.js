(function () { // define funcionalidad
  var app = angular.module('grupos', ["ui.router"]);

  app.directive('gruposTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/gruposTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.grupos = [];
        $scope.cursos = [];
        $scope.profesores = [];
        $scope.profesoresSeleccionados = [];

        $http.get('json/usuarios.json').success(function (data) {
          $scope.profesores = data;
        });
        
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

        $scope.agregarProfesor = function(){


          angular.forEach($scope.profesores, function(value, key) {
            if(value.id == $scope.profesor){
              $scope.profesor = value.name;
              $scope.profesorId = value.id;
              $scope.profesorApellido = value.lastname;
            }
          });
          $scope.profesoresSeleccionados.push({id: $scope.profesorId, nombre: $scope.profesor, apellido:$scope.profesorApellido });
          console.log($scope.profesoresSeleccionados);
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