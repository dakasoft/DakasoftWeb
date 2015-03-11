(function () { // define funcionalidad
  var app = angular.module('proyectos', ["ui.router"]);

  app.directive('proyectosVotacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosVotacion.html',
      controller: ['$scope','$http','ngTableParams',function ($scope, $http, ngTableParams) {
        var proyectosCtrl = this;
        $http.get('json/proyectosVotacion.json').success(function (data) {
          console.log("proyectos");
          proyectosCtrl.proyectos = data;
        });
      }],
      controllerAs: 'proyectoCtrl'
    };
  });

  app.directive('modalProyectoVotacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalProyectosVotacion.html',
      controller: ['$scope','$http',function ($scope,$http) {
        
      }],
      controllerAs: 'modalCntrl'
    };
  });
  

})();