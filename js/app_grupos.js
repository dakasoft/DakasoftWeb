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
        $scope.estudiantesSeleccionados = [];
        $scope.editableGrupo = "";

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
          console.log(grupo);
          $scope.editableGrupo = grupo;
          $scope.nombreGrupo = grupo.nombre;
          $scope.curso = grupo.cursoId;
          //$scope.cursoId = grupo.cursoId;
          //$scope.profesoresSeleccionados = grupo.profesores;
          //$scope.estudiantesSeleccionados = grupo.estudiantes;
          $scope.encargado  = grupo.encargadoId;
          //$scope.encargadoId  = grupo.encargadoId;
        };

        $scope.borrar = function(grupo){
          angular.forEach($scope.grupos, function(value, key) {
            if(value.id == grupo.id){
              $scope.grupos.splice(key, 1);
            }
          });
        };

        $scope.agregar = function(){
          $scope.editableGrupo = ""
          $scope.nombreGrupo = "";
          $scope.curso = "";
          $scope.cursoId = "";
          $scope.profesoresSeleccionados = [];
          $scope.estudiantesSeleccionados = [];
          $scope.encargado  = "";
          $scope.encargadoId  = "";
        };

        $scope.agregarProfesor = function(){

          angular.forEach($scope.profesores, function(value, key) {
            if(value.id == $scope.profesor){
              $scope.profesor = value.name;
              $scope.profesorId = value.id;
              $scope.profesorApellido = value.lastname;
            }
          });
          if($scope.profesor){
            $scope.profesoresSeleccionados.push({id: $scope.profesorId, nombre: $scope.profesor, apellido:$scope.profesorApellido });
            $scope.profesor = "";
          }

        };

        $scope.quitarProfesor = function(profe){
          console.log("eliminando"+profe.id);
          $scope.profesores = [];
          angular.forEach($scope.profesoresSeleccionados, function(value, key) {
            if(value.id == profe.id){
              console.log(value.id);
              $scope.profesoresSeleccionados.splice(key, 1);
            }
          });
        };

        $scope.guardar = function(){
          console.log($scope.editableGrupo);
          if($scope.editableGrupo != ""){ // faltan agregar los demas
            $scope.editableGrupo.nombre = $scope.nombreGrupo;
          }else{
            angular.forEach($scope.cursos, function(value, key) {
              if(value.id == $scope.curso){
                $scope.curso = value.nombre;
                $scope.cursoId = value.id;
              }
            });

            angular.forEach($scope.profesores, function(value, key) {
              if(value.id == $scope.encargado){
                $scope.encargado = value.name;
                $scope.encargadoId = value.id;
                $scope.encargadoApellido = value.lastname;
              }
            }); 

            var lastGrupo = $scope.grupos[$scope.grupos.length - 1];
            var newId =  lastGrupo.id+1;

            $scope.grupos.push({
              id:newId,
              nombre:$scope.nombreGrupo,
              curso:$scope.curso,
              cursoId:$scope.cursoId,
              encargado:$scope.encargado,
              encargadoId:$scope.encargadoId,
              profesores:$scope.profesoresSeleccionados,
              estudiantes: []
            });
            console.log($scope.grupos);
          }
          $scope.nombreGrupo = "";
          //$scope.encargado = "";
          //$scope.curso = "";

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