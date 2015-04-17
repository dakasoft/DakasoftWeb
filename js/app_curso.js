(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursos/tabla.html',
      controller: ['$scope','$http','funciones',function ($scope,$http,funciones) {
      $scope.cursos = [];
      $scope.areas = [];
      $scope.curso = funciones.curso();

      
        $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;;
          })
          .error(function(data,status){
            result = data || "jiji"
          });

           $http.get('php/listarAreas.php')
          .success(function (data) {
            //console.log(data);
            $scope.areas = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });
          

  

        $scope.editar = function(curso){
          funciones.closeC();
          $scope.curso =  angular.copy(curso);
          $http.post("php/listarAreasCurso.php", { "data" : $scope.curso})
          .success(function(data) {
            $scope.curso.Areas = data; // duda
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           });     
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(curso){
          $scope.curso = curso;
          $scope.entidad = "curso";
        }

        $scope.borrar = function(){
            $http.post("php/borrarCurso.php", { "data" : $scope.curso}) // 
          .success(function(data) {
            $scope.cursos=funciones.borrarDeLista($scope.cursos,$scope.curso);
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           });        
          $("#modalConfirm").modal('hide');
        };        

        $scope.borrarArea = function(area){
          $scope.curso.area = funciones.borrarDeLista($scope.curso.Areas,area); 
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.curso = funciones.curso()
          $scope.accion = "Nuevo";
        };

        $scope.agregarArea = function(area){
          funciones.agregarAListaNoRepetido($scope.curso.Areas,area);
        };
    
        $scope.guardar = function(curso){
          if($scope.cursosForm.$valid){
            if(curso.id==""){
              $http.post("php/crearCurso.php", { "data" : $scope.curso})
              .success(function(data) {
                $( "#modalCurso" ).append(data);
                 console.log(data.Insert_Id);
                 if(data.Insert_Id != ""){
                  $scope.curso.id = data.Insert_Id;
                  $http.post("php/guardarAreas.php", { "data" : $scope.curso})
                  .success(function(data) {                    
                      $scope.cursos = funciones.agregarAListaNoRepetido($scope.cursos,curso);
                      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                      setTimeout(function(){$("#modalCurso").modal('hide')},1000);  
                   })
                  .error(function(data, status) {
                      result = data || "Request failed";//hacer algo con esto.
                   }); 
                 }
 
               })
              .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
               }); 
            }else{ //Pending
              $http.post("php/modificarCurso.php", { "data" : $scope.curso})
              .success(function(data) {
                $scope.cursos = funciones.editarDeLista($scope.cursos,curso);
                funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalCurso").modal('hide')},1000);  
               })
              .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
               }); 
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
