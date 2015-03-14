(function () { // define funcionalidad
  var app = angular.module('proyectosVotacion', ["ui.router"]);

  app.directive('proyectosVotacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosVotacion.html',
      controller: ['$scope','$http','ngTableParams',function ($scope, $http, ngTableParams) {
        $scope.proyectos = [];
        $scope.proyectob = "";
        $scope.usuarios = [];
        $scope.usuariosSeleccionados = [];
        $scope.proyectosSeleccionados = [];
        $http.get('json/proyectos.json').success(function (data) {
          $scope.proyectos = data;
        });
        $http.get('json/usuarios.json').success(function (data) {
          $scope.usuarios = data;
        });
        $scope.agregarProyecto = function(proyecto){
          var ingresar = true;
          angular.forEach($scope.proyectosSeleccionados,function(value,key){
            if(value.id == proyecto.id){
              ingresar = false;
            }
          });
          if(ingresar || $scope.proyectosSeleccionados.length == 0){
           $scope.proyectosSeleccionados.push(proyecto);

         }

       };

       $scope.EliminarProyecto=function(){
        console.log($scope.proyectob);

        angular.forEach($scope.proyectosSeleccionados, function(value, key) {
          if(value.id == $scope.proyectob.id){
            $scope.proyectosSeleccionados.splice(key, 1);
          }
        });
        $("#modalConfirm").modal('hide');
      }

      $scope.borrarEste=function(proyecto){
        $scope.proyectob=proyecto;
      }


      $scope.agregarUsuarios = function(usuario){
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