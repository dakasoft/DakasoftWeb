(function () { // define funcionalidad
  var app = angular.module('proyectos', ["ui.router"]);

  app.directive('proyectosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope, $http, ngTableParams) {
        var proyectosCtrl = this;
        $http.get('json/proyectos.json').success(function (data) {
          console.log("proyectos");
          proyectosCtrl.proyectos = data;
        });
      }],
      controllerAs: 'proyectoCtrl'
    };
  });

  app.directive('modalProyecto',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalProyectos.html',
      controller: ['$scope','$http',function ($scope,$http) {
        
      }],
      controllerAs: 'modalCntrl'
    };
  });
  

})();