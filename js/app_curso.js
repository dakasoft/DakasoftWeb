(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursos/tabla.html',
      controller: ['$scope','$http','funciones',function ($scope,$http,funciones) {
      $scope.cursos = [];
      $scope.areasAcademicas = [];
      $scope.curso = funciones.curso();

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });

        $http.get('json/areas.json').success(function (data) {
          $scope.areasAcademicas = data;
        });


        $scope.editar = function(curso){
          funciones.closeC();
          $scope.curso =  angular.copy(curso);
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(curso){
          $scope.curso = curso;
          $scope.entidad = "curso";
        }

        $scope.borrar = function(){
          $scope.cursos=funciones.borrarDeLista($scope.cursos,$scope.curso);      
          $("#modalConfirm").modal('hide');
        };        

        $scope.borrarArea = function(area){
          console.log(area);
          $scope.carrera.area = funciones.borrarDeLista($scope.curso.area,area);  
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.curso = funciones.curso()
          $scope.accion = "Nuevo";
        };

        $scope.agregarArea = function(area){
          funciones.agregarAListaNoRepetido($scope.curso.area,area);
        };
    
        $scope.guardar = function(curso){
          if($scope.cursosForm.$valid){
            if(curso.id==""){//es nuevo usuario
              curso.id = funciones.nuevoId($scope.cursos);
              $scope.cursos = funciones.agregarALista($scope.cursos,curso);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalCurso").modal('hide')},1000);   
            }else{ //editar usuario
              $scope.cursos = funciones.editarDeLista($scope.cursos,curso);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalCurso").modal('hide')},1000);  
            }
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          } 
        };

      }]
    };
  });

    app.directive('modalCurso',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursos/modalCurso.html'
    };

});


})();
