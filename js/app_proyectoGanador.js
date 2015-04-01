(function () { // define funcionalidad
  var app = angular.module('proyectoganador', ["ui.router"]);


  app.directive('proyectoGana',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verProyectoGanador.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.estudiantes = [];

        $http.get('json/estudiantes.json').success(function (data) {
          $scope.estudiantes = data;
        }); 

      // $scope.toogleInfo = function(estado){
      //   if(estado)
      //   {
      //     return false;
      //   }
      //   return true;
      // }

      }],
      controllerAs: 'modalCntrl'
      }
    });

})();