(function () { // define funcionalidad
  var app = angular.module('loginU', ['ui.router']);

  app.directive('dkLogin',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/login.html',
      controller: ['$scope', '$http', '$state', function ($scope, $http, $state) {
        var login = this,
            sSuccessState = 'home';

        //Funcion que se ejecuta cuando un usuario intenta loguearse a la aplicación
        login.loginSubmit = function (pMain) {
          if (login.loginRequest.email && login.loginRequest.password) {
            $http.get('json/usuarios.json')
              .success(function (data) {
                var aUsers = data.users,
                    sEmail = login.loginRequest.email,
                    sPassword = login.loginRequest.password,
                    bRememberMe = login.loginRequest.rememberMe

                //Llamado a la funcion que evalua si la contraseña correseponde al usuario
                return login.loginEval(pMain, aUsers, sEmail, sPassword, bRememberMe);
              })
              .error(function (e) {
                console.log(e);
              });
          }
        };

        //Funcion que compara el usuario y la contraseña con los valores de un array de objetos
        login.loginEval = function (pMain, paUsers, psEmail, psPassword, pbRememberMe) {
          var i = 0,
              oSuccessUser = {},
              bLogin = false;

          for (i = 0; i < paUsers.length; i++) {
            var sNameTemp = paUsers[i].email,
                sPassTemp = paUsers[i].password;

            if (sNameTemp === psEmail && sPassTemp === psPassword) {
              oSuccessUser = paUsers[i];
              bLogin = true;
              break;
            }
          };

          //Condicional que ejecuta una función dependiendo del resultado de la comparacion de usuario y contraseña
          if (bLogin === true) {
            login.loginSuccess(pMain, oSuccessUser, psEmail, psPassword, pbRememberMe);
          } else {
            return login.loginFail();
          }
        }

        //Funcion que se ejecuta cuando la contraseña SI corresponde al usuario
        login.loginSuccess = function (pMain, poUser, psEmail, psPassword, pbRememberMe) {
          var rememberMe = JSON.stringify({
            email: psEmail,
            password: psPassword
          });

          //Condicional que evalua si el usuario actual desea que su usuario y contraseña sean "guardados", (se guardan en localStorage);
          if (pbRememberMe) {
            localStorage.setItem('rememberMe', rememberMe);
            console.log(localStorage.getItem('rememberMe'));
          } else {
            localStorage.removeItem('rememberMe');
          };

          pMain.currentUser = poUser;
          pMain.bLoggedIn = true;
          $state.go(sSuccessState);
        }
        //Funcion que se ejecuta cuando la contraseña NO corresponde al usuario
        login.loginFail = function () {
          console.log('Failed Login');
          return false;
        }

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