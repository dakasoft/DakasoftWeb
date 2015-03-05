(function () { // define funcionalidad
  var app = angular.module('usuarios', ["ui.router"]);

  app.directive('usuariosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/usuariosTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
      $scope.usuarios = [];
        $http.get('json/usuarios.json').success(function (data) {
          $scope.usuarios = data;
        });
      }],
      controllerAs: 'usuarios'
    };
  });

})();