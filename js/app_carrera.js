(function () { // define funcionalidad
  var app = angular.module('carreras', ["ui.router"]);

  app.directive('carrerasTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carreras/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.carreras = [];
        $scope.cursos = [];
        $scope.carrera = funciones.carrera();
        $scope.curso = funciones.curso();

        /*Get de usuarios y roles*/
        $http.get('json/carreras.json').success(function (data) {
          $scope.carreras = data;
        });

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });
        /*Funciones*/
        $scope.editar = function(carrera){
          funciones.closeC();
          $scope.carrera =  angular.copy(carrera);
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(carrera){
          $scope.carrera = carrera;
          $scope.entidad = "carrera";
        }

        $scope.borrar = function(){
          $scope.carreras=funciones.borrarDeLista($scope.carreras,$scope.carrera);      
          $("#modalConfirm").modal('hide');
        };

        $scope.borrarCurso = function(curso){
          funciones.borrarDeLista($scope.carrera.cursos,curso);
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.carrera = funciones.carrera()
          $scope.accion = "Nueva";
        };

        $scope.agregarCurso = function(curso){
          funciones.agregarAListaNoRepetido($scope.carrera.cursos,curso);
        };

        $scope.guardar = function(carrera){
          if($scope.carrerasForm.$valid){
            if(carrera.id==""){//es nuevo usuario
              carrera.id = funciones.nuevoId($scope.carreras);
              $scope.carreras = funciones.agregarALista($scope.carreras,carrera);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalCarrera").modal('hide')},1000);   
            }else{ //editar usuario
              $scope.carreras = funciones.editarDeLista($scope.carreras,carrera);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalCarrera").modal('hide')},1000);  
            }
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }  
        };
      }]
    };
  });

  app.directive('modalCarrera',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carreras/modalCarrera.html',
    };
  });

})();