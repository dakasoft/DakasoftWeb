(function () { // define funcionalidad
  var app = angular.module('usuarios', ["ui.router"]);

  app.directive('usuariosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/usuariosTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
      $scope.usuarios = [];
      $scope.editableUser = "";

     // $scope.mensaje = "hola";
      $http.get('json/usuarios.json').success(function (data) {
        $scope.usuarios = data;
      });
/*
      $scope.tableParams = new ngTableParams({page: 1,count: 10}, 
        {
          total: $scope.usuarios.length, // length of data
          getData: function($defer, params) {
            console.log($scope.mensaje);
            $defer.resolve($scope.usuarios.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
      });*/
      
      $scope.editar = function(user){
        $scope.editableUser = user;
        $scope.nombre = user.name;
        $scope.apellido = user.lastname;
        $scope.email = user.email;
        $scope.pass = user.password;
        $scope.role = user.role;
      };

      $scope.agregar = function(){
        $scope.editableUser = "";
        $scope.nombre = "";
        $scope.apellido = "";
        $scope.email = "";
        $scope.pass = "";
        $scope.role = "";  
      };

      $scope.guardar = function(){
        if($scope.editableUser != ""){
          $scope.editableUser.name = $scope.nombre;
        }else{
          $scope.usuarios.push({name: $scope.nombre});/*Agregar más*/
        }
      $("#editModal").modal('hide');

      };

      }],
      controllerAs: 'usuariosCntrl'
    };
  });

  app.directive('modal',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalEditUser.html',
      controller: ['$scope','$http',function ($scope,$http) {
        /*$scope.guardar = function(){
          console.log("la onda");
          $scope.mensaje2 = $scope.mensaje
        };*/
      }],
      controllerAs: 'modalCntrl'
    };
  });

})();