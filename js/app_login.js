(function () { // define funcionalidad
  var app = angular.module('loginU', ['ui.router']);

  app.directive('dkLogin',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/login.html',
      controller: ['$scope', '$http', '$state','$rootScope', 'funciones', function ($scope, $http, $state, $rootScope, funciones) {
        var login = this,
            sSuccessState = 'home';

        //Funcion que se ejecuta cuando un usuario intenta loguearse a la aplicación
        login.loginSubmit = function () {
          if (login.loginRequest.email && login.loginRequest.password) {
            $http.post('php/loginRequest.php', {"email":login.loginRequest.email, "password": login.loginRequest.password})
            .success(function (data) {
              var userData = {};
              if (data.Error) {
                funciones.alert("divLogin","error",'<strong>Fail!...</strong>' + data.Error,3500);
              } else {
                $rootScope.currentUser = data;

                $http.post('php/solicitarRolLogin.php', {"data":data.IdRol})
                .success(function (pData) {
                  $rootScope.currentUser.role = pData.Nombre;
                });
                localStorage.setItem('userData', JSON.stringify($rootScope.currentUser));
                $rootScope.bLoggedIn = true;
                $state.go(sSuccessState);
              }
            })
            .error(function (pError) {
              console.log(pError);
            });
          }
        };

        //Funcion que tiene como objetivo escribir de manera predeterminada el usuario y contraseña del usuario que lo solicitó en la ultima sesion
        //NO es funcional
        // login.init = function () {
        //   var oRememberMe = {};
        //   if (localStorage.rememberMe) {
        //     oRememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        //     login.loginRequest.email = oRememberMe.email;
        //     login.loginRequest.password = oRememberMe.password;
        //   };
        // }
      }],
      controllerAs: 'login'
    };
  });

})();