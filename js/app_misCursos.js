(function () { // define funcionalidad
  var app = angular.module('misCursos', ["ui.router"]);


  app.controller('misCursos', ['$scope','$http', function($scope,$http) {
    $scope.estudianteActual = {};
    $http.get('json/estudiantes.json').success(function (data) {
      $scope.estudianteActual = data;
      console.log($scope.estudianteActual);
     });

    $scope.guardarInfoEquipo = function(curso){
    	//logica para guardar datos de equipo
    	console.log(curso);
    }

    $scope.toogleInfo = function(estado){
    	if(estado)
    	{
    		return false;
    	}
    	return true;
    }

}]);

  app.directive('navCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/navCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalMiEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalMiEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();