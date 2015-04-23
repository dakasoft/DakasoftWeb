(function () { // define funcionalidad
  var app = angular.module('misCursos', ["ui.router"]);


  app.controller('misCursos', ['$rootScope','$scope','$http', function ($rootScope,$scope,$http) {

    $scope.grupos = {};
    $scope.entidad = "";

    $http.post('php/gruposPorEstudiante.php',{ "data" : $rootScope.currentUser.id }).success(function (data) {
      $scope.grupos = data;
    });

    $scope.toogleInfo = function(grupo,view,estado){  
      $scope.grupoActual = grupo;
      if(view=="informacion"){
        grupo.ests = false;
        grupo.eqps = false;
        grupo.rol = false;
      }else if(view=="eqps"){
        grupo.ests = false;
        grupo.informacion = false;
        grupo.rol = false;
      }
      if(estado){
        return false;
      }else{
        return true; 
      }
    
    }

  }]);

  app.directive('navCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/navCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalMiEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/modalEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('miEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/miEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {
      console.log($scope.grupoActual);
      //buscamos si ese grupo tiene un equipo y si tiene entonces le metemos integrantes
      $http.post("php/estudiantesPorEquipo.php", { "data" : $scope.grupoActual.IdEquipo})
      .success(function(data) {
          $scope.grupoActual.Integrantes = data; 
          console.log($scope.grupoActual.Integrantes);
       })

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('miCurso',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/miCurso.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();