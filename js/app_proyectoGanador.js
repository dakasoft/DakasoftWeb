(function () { // define funcionalidad
  var app = angular.module('proyectoganador', ["ui.router"]);


  app.directive('proyectoGana',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verProyectoGanador.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.ganador = [];

        $http.get('json/proyectoGanador.json').success(function (data) {
          $scope.ganador = data;
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