(function () { // define funcionalidad
  var app = angular.module('carreras', ["ui.router"]);

  app.directive('carrerasTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carrerasTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
      $scope.usuarios = [];
        $http.get('json/usuarios.json').success(function (data) {
          $scope.usuarios = data;
        });
      }],
      controllerAs: 'carreras'
    };
  });

})();