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
        $scope.estudiantes = [];
        $scope.areasG = [];
        $scope.profesoresSeleccionados = [];
        $scope.estudiantesSeleccionados = [];
        $scope.editableGrupo = "";


        $http.get('json/usuarios.json').success(function (data) {
          $scope.profesores = data;
          $scope.estudiantes = data;
        });
        
        $http.get('json/grupos.json').success(function (data) {
          $scope.grupos = data;
        });

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });

        $http.get('json/areas.json').success(function (data) {
          $scope.areasG = data;
        });

        $scope.editar = function(grupo){
          $scope.editableGrupo = grupo;
          $scope.nombreGrupo = grupo.nombre;
          $scope.curso = grupo.cursoId;
          $scope.profesoresSeleccionados = angular.copy(grupo.profesores);
          $scope.estudiantesSeleccionados = angular.copy(grupo.estudiantes);
          $scope.encargado  = grupo.encargadoId;
          $scope.profesor = 0;
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

            var ingresar = true;

            angular.forEach($scope.profesoresSeleccionados,function(value,key){
              if(value.id == $scope.profesorId){
                ingresar = false;
              }
            });

            if(ingresar || $scope.profesoresSeleccionados.length == 0){
              $scope.profesoresSeleccionados.push({id: $scope.profesorId, nombre: $scope.profesor, apellido:$scope.profesorApellido, area:""});
              $scope.profesor = "";
            }
          }
        };

        $scope.cambiarArea = function(profe,selectedArea){
          profe.area = selectedArea; 

          angular.forEach($scope.profesoresSeleccionados,function(value,key){
            if(value.id == profe.id){
              value.area = profe.area;
            }
          });

        };

        $scope.agregarEstudiante = function(estudiante){
          angular.forEach($scope.estudiantes, function(value, key) {
            if(value.id == estudiante.id){
              $scope.estudiante = estudiante.name;
              $scope.estudiantesId = estudiante.id;
              $scope.estudiantesApellido = estudiante.lastname;
            }
          });

          if($scope.estudiante){
            var ingresar = true;

            angular.forEach($scope.estudiantesSeleccionados,function(value,key){
              if(value.id == $scope.estudiantesId){
                ingresar = false;
              }
            });

            if(ingresar || $scope.estudiantesSeleccionados.length == 0){
              $scope.estudiantesSeleccionados.push({id: $scope.estudiantesId, nombre: $scope.estudiante, apellido:$scope.estudiantesApellido });
              $scope.estudiante = "";
            }
          }
        };

        $scope.quitarProfesor = function(profe){
          angular.forEach($scope.profesoresSeleccionados, function(value, key) {
            if(value.id == profe.id){
              $scope.profesoresSeleccionados.splice(key, 1);
            }
          });
        };

        $scope.quitarEstudiante = function(estudiante){
          angular.forEach($scope.estudiantesSeleccionados, function(value, key) {
            if(value.id == estudiante.id){
              $scope.estudiantesSeleccionados.splice(key, 1);
            }
          });
        };

        $scope.guardar = function(){

          //$scope.profesoresdeGrupo = $scope.profesoresSeleccionados;
          /*buscamos los roles correspondientes*/

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

          if($scope.editableGrupo != ""){ 
            $scope.editableGrupo.nombre = $scope.nombreGrupo;
            $scope.editableGrupo.curso = $scope.curso;
            $scope.editableGrupo.cursoId = $scope.cursoId;
            $scope.editableGrupo.encargado = $scope.encargado;
            $scope.editableGrupo.encargadoId = $scope.encargadoId;
            $scope.editableGrupo.profesores = $scope.profesoresSeleccionados;
            $scope.editableGrupo.estudiantes = $scope.estudiantesSeleccionados;
          }else{

            var lastGrupo = $scope.grupos[$scope.grupos.length - 1];
            if(lastGrupo){
              var newId =  lastGrupo.id+1;
            }else{
              var newId =  1;
            }

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
          $scope.estudiantesSeleccionados = [];
          $scope.profesoresSeleccionados = [];

          $("#estudiantesGrupoModal").modal('hide');
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

      }],
      controllerAs: 'modalGrupoCntrl'
    };
  });

  app.directive('modalEstudianteGrupo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalEstudiantesGrupo.html',
      controller: ['$scope','$http',function ($scope,$http) {
      }],
      controllerAs: 'modalEstudianteGrupoCntrl'
    };
  });


})();

