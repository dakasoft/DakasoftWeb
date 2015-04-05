(function () { // define funcionalidad
  var app = angular.module('usuarios', ["ui.router"]);

  app.directive('usuariosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/usuarios/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.usuarios = []; //todos los usuarios
        $scope.usuario = funciones.usuario(); //objeto usuario
        $scope.roles = [];
        $scope.entidad = "usuario";
        $scope.editarUsuario = [];

        /*Get de usuarios y roles*/
        $http.get('json/usuarios.json').success(function (data) {
          $scope.usuarios = data;
        });        

        $http.get('json/roles.json').success(function (data) {
          $scope.roles = data;
        });

        /*Funciones*/
        $scope.editar = function(usuario){
          funciones.closeC();
          $scope.usuario =  angular.copy(usuario);
        };

        $scope.borrarObjeto= function(usuario){
          $scope.usuario = usuario;
          $scope.entidad = "usuario";
        }

        $scope.borrar = function(entidad){  
          $scope.usuarios=funciones.borrarDeLista($scope.usuarios,$scope.usuario);      
          $("#modalConfirm").modal('hide');
        };

        $scope.nuevo = function(){
          funciones.closeC();//limpia el modal
          $scope.usuario = funciones.usuario()
        };

        $scope.guardar = function(usuario){
          if($scope.usuariosForm.$valid){
            if(usuario.id==""){//es nuevo usuario
              usuario.id = funciones.nuevoId($scope.usuarios);
              usuario.rol.nombre = usuario.rol.label;
              $scope.usuarios = funciones.agregarALista($scope.usuarios,usuario);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalUsuario").modal('hide')},1000);   
            }else{ //editar usuario
              usuario.rol.nombre = usuario.rol.label;
              $scope.usuarios = funciones.editarDeLista($scope.usuarios,usuario);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalUsuario").modal('hide')},1000);  
            }
          }else{
            console.log(usuario);
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
            if(usuario.email==""){
               funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);

            }
            else if(usuario.email == undefined){
               funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> El correo no es válido',3500);
            }
          }   
        };
      }]
    };
  });

  app.directive('modalUsuario',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/usuarios/modalUsuario.html',
    };
  });
  

})();