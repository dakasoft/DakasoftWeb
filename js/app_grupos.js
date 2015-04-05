(function () { // define funcionalidad
  var app = angular.module('grupos', ["ui.router"]);

  app.directive('gruposTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.grupos = [];
        $scope.cursos = [];
        $scope.grupo = funciones.grupo();
        $scope.areasAcademicas = [];
        $scope.profesores = [];
        $scope.estudiantes = [];

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
          $scope.areasAcademicas = data;
        });

        $scope.editar = function(grupo){
          funciones.closeC();
          $scope.grupo =  angular.copy(grupo);
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(grupo){
          $scope.grupo = grupo;
          $scope.entidad = "grupo";
        }

       $scope.borrar = function(){
          $scope.carreras=funciones.borrarDeLista($scope.grupos,$scope.grupo);      
          $("#modalConfirm").modal('hide');
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.grupo = funciones.grupo()
          $scope.accion = "Nuevo";
        };

        $scope.agregarProfesor = function(profesor){
          funciones.agregarAListaNoRepetido($scope.grupo.profesores,profesor);
        };

        $scope.cambiarArea = function(profe,selectedArea){
          profe.area = selectedArea; 

          angular.forEach($scope.grupos.profesores,function(value,key){
            if(value.id == profe.id){
              value.area = profe.area;
            }
          });

        };

        $scope.agregarEstudiante = function(estudiante){
          funciones.agregarAListaNoRepetido($scope.grupo.estudiantes,estudiante);
        };

        $scope.quitarProfesor = function(profesor){
          funciones.borrarDeLista($scope.grupo.profesores,profesor);
        };

        $scope.quitarEstudiante = function(estudiante){
          funciones.borrarDeLista($scope.grupo.estudiantes,estudiante);
        };

        $scope.guardar = function(grupo){
          if($scope.gruposForm.$valid){
            if(grupo.id==""){//es nuevo usuario
              grupo.id = funciones.nuevoId($scope.grupos);
              $scope.grupos = funciones.agregarALista($scope.grupos,grupo);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalGrupo").modal('hide')},1000);   
            }else{ //editar usuario
              $scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalGrupo").modal('hide')},1000);  
            }
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }  
        };

        $scope.guardarEstudiante = function(grupo){
          $scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
          funciones.alert("contentbody2","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
          setTimeout(function(){$("#modalEstudiantes").modal('hide')},1000);  
            
        };

      }]
    };
  });

  app.directive('modalGrupo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/modalGrupo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalGrupoCntrl'
    };
  });

  app.directive('modalEstudiantes',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/grupos/modalEstudiantes.html',
      controller: ['$scope','$http',function ($scope,$http) {
      }],
      controllerAs: 'modalEstudianteGrupoCntrl'
    };
  });


})();

