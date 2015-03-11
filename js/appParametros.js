(function () { // define funcionalidad
  var app = angular.module('parametros', ["ui.router"]);

     app.directive('parametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametrosP.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.parametros = [];
        $http.get('json/parametros.json').success(function (data) {
          $scope.parametros = data;

        }); 
        

      }],
      controllerAs: 'parametros'
    };
  });



})();