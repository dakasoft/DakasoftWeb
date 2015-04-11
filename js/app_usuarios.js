(function () { // define funcionalidad
  var app = angular.module('usuarios', ["ui.router"]);

  app.directive('usuariosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/usuarios/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones','appServices',function ($scope,$http,ngTableParams,funciones,appServices) {
        $scope.usuarios = []; //todos los usuarios
        $scope.usuario = funciones.usuario(); //objeto usuario
        $scope.roles = [];
        $scope.entidad = "usuario";
        $scope.editarUsuario = [];

        $http.get('php/listarUsuarios.php')
          .success(function (data) {
            $scope.usuarios = data;
            $scope.cambioExtrategico($scope.usuarios);
          })
          .error(function(data,status){
            result = data || "jiji"
          });

        $http.get('json/roles.json').success(function (data) {
          $scope.roles = data;
        });

        /*Funciones*/
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

        $scope.editar = function(usuario){
          funciones.closeC();
          $scope.usuario =  angular.copy(usuario);
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(usuario){
          $scope.usuario = usuario;
          $scope.entidad = "usuario";
        }

        $scope.borrar = function(entidad){  
          $http.post("php/borrarUsuario.php", { "data" : $scope.usuario})
          .success(function(data) {
            $scope.usuarios=funciones.borrarDeLista($scope.usuarios,$scope.usuario);
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           });      
          $("#modalConfirm").modal('hide');
        };

        $scope.nuevo = function(){
          funciones.closeC();//limpia el modal
          $scope.usuario = funciones.usuario()
          $scope.accion = "Nuevo";
        };

        $scope.guardar = function(usuario){
          if($scope.usuariosForm.$valid){
            if(usuario.id==""){
              $http.post("php/crearUsuario.php", { "data" : $scope.usuario})
              .success(function(data) {
                  usuario.id = parseInt(data.Insert_Id);
                  $scope.usuarios = funciones.agregarALista($scope.usuarios,usuario);
                  funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                  setTimeout(function(){$("#modalUsuario").modal('hide')},1000);  
               })
              .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
               });  
            }else{ 
              $scope.usuario.id = parseInt($scope.usuario.id );
              $http.post("php/modificarUsuario.php", { "data" : $scope.usuario})
              .success(function(data) {
                console.log(data);
                $scope.usuarios = funciones.editarDeLista($scope.usuarios,usuario);
                funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalUsuario").modal('hide')},1000);   
               })
              .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
               });
            }
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
            if(usuario.Email==""){
               funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);

            }
            else if(usuario.Email == undefined){
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