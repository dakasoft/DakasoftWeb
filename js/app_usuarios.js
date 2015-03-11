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
          console.log("usuarios");
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
        });
        */

        $scope.editar = function(user){
          $scope.editableUser = user;
          $scope.nombre = user.name;
          $scope.apellido = user.lastname;
          $scope.email = user.email;
          $scope.pass = user.password;
          $scope.role = user.role;
        };


        $scope.borrar = function(user){        
          angular.forEach($scope.usuarios, function(value, key) {
            console.log(user.id);
            if(value.id == user.id){
              $scope.usuarios.splice(key, 1);
            }
          });
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
            $scope.editableUser.lastname = $scope.apellido;
            $scope.editableUser.email = $scope.email;
            $scope.editableUser.pass = $scope.pass;

            angular.forEach($scope.roles, function(value, key) {
              if(value.id == $scope.role){
                $scope.editableUser.role = value.label;
              }
            });
          }else{
            var lastUser = $scope.usuarios[$scope.usuarios.length - 1];
            var newId =  lastUser.id+1;
            /* each temporal para mostrar rol*/
            angular.forEach($scope.roles, function(value, key) {
              if(value.id == $scope.role){
                $scope.role = value.label;
              }
            });

            console.log($scope.role);
            $scope.usuarios.push({id:newId,name: $scope.nombre, lastname: $scope.apellido,
              email: $scope.email, password: $scope.pass, role: $scope.role
            });
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
        $scope.roles = [{id:'1', label:'Admin'},{id:'2', label:'Decano'},
          {id:'3', label:'Director académico'},{id:'4', label:'Profesor'},
          {id:'5', label:'Estudiante'}
        ];
      }],
      controllerAs: 'modalCntrl'
    };
  });
  

})();