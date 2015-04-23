(function () { // define funcionalidad
  var app = angular.module('proyectosVotacion', ["ui.router"]);

  app.directive('proyectosVotacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosVotacion.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope, $http, ngTableParams,funciones) {
        $scope.proyectos = [];
        $scope.proyectob = "";
        $scope.usuarios = [];
        $scope.usuariosSeleccionados = [];
        $scope.proyectosSeleccionados = [];
         $http.get('php/listarProyectosElegidos.php')
          .success(function (data) {
              $scope.proyectos= data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });
          $http.get('php/listarUsuarios.php')
          .success(function (data) {
               $scope.usuarios = data;
               $scope.cambioExtrategico($scope.usuarios);
          })
          .error(function(data,status){
            result = data || "jiji"
          });


           $scope.cambioExtrategico = function(usuarios){
          angular.forEach(usuarios, function(value, key) {
            if(value.IdRol == 1){
              value.rol = {id:1,nombre:"Admin"};
            }else if(value.IdRol == 2){
              value.rol = {id:2,nombre:"Decano"};
            }else if(value.IdRol == 3){
              value.rol = {id:3,nombre:"Director académico"};
            }else if(value.IdRol == 4){
              value.rol = {id:4,nombre:"Profesor"};
            }else if(value.IdRol == 5){
              value.rol = {id:5,nombre:"Estudiante"};
            }
          });
          $scope.usuarios = usuarios;
        };
        $scope.agregarProyecto = function(proyecto){

          var ingresar = true;
          angular.forEach($scope.proyectosSeleccionados,function(value,key){
            if(value.id == proyecto.id){
              ingresar = false;
            }
          });
          if(ingresar || $scope.proyectosSeleccionados.length == 0){

           $http.post("php/actualizarProyectosElegidos.php", { "data" : proyecto})
          .success(function(data) {
             $scope.proyectosSeleccionados=funciones.agregarAListaNoRepetido( $scope.proyectosSeleccionados,proyecto); 
           })

         }

       };

       $scope.EliminarProyecto=function(){
        console.log($scope.proyectob);
        angular.forEach($scope.proyectosSeleccionados, function(value, key) {
          if(value.id == $scope.proyectob.id){
             $http.post("php/actualizarProyectosElegidosFalse.php", { "data" : $scope.proyectob})
          .success(function(data) {
            console.log(data);
              $scope.proyectosSeleccionados=funciones.borrarDeLista($scope.proyectosSeleccionados,$scope.proyectob);
           })
          }
        });
        $("#modalConfirm").modal('hide');
      }

      $scope.borrarEste=function(proyecto){
        $scope.proyectob=proyecto;
      }


      $scope.agregarUsuarios = function(usuario){
         // $http.post("php/actualizarProyectosElegidos.php", { "data" : usuario})
         //  .success(function(data) {
         //     $scope.usuariosSeleccionados=funciones.agregarAListaNoRepetido( $scope.usuariosSeleccionados,usuario); 
         //   })
       $scope.usuariosSeleccionados.push(usuario);
       angular.forEach($scope.usuarios, function(value, key) {
        if(value.id == usuario.id){
          $scope.usuarios.splice(key,1);
        }                 
      });                                                                
     };

     $scope.quitarUsuarios = function(usuario){
       angular.forEach($scope.usuariosSeleccionados, function(value, key) {
        if(value.id == usuario.id){
         $scope.usuariosSeleccionados.splice(key, 1);
         $scope.usuarios.unshift(usuario);
       }
     });

     }; 

     $scope.guardar= function(){
      $("#elegirVot").modal('hide');

    }


  }],
  controllerAs: 'proyectoCtrl'
};
});

app.directive('modalProyectosvotacion',function ($http) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/modalProyectosvotacion.html',
    controller: ['$scope','$http',function ($scope,$http) {

    }],
    controllerAs: 'modalProyectosvotacion'
  };
});

app.directive('modalConfirmv',function ($http) {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/ModalConfirmacion.html',
    controller: ['$scope','$http',function ($scope,$http) {

    }],
    controllerAs: 'modalConfirm'
  };
});


})();