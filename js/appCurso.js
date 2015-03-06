(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursosTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
      $scope.usuarios = [];
        $http.get('json/carreras.json').success(function (data) {
          $scope.carreras = data;
        });
      }],
      controllerAs: 'cursos'
    };
  });

})();
