(function () { // define funcionalidad
  var app = angular.module('misCursos', ["ui.router"]);


  app.controller('misCursos', ['$rootScope','$scope','$http', function ($rootScope,$scope,$http) {
    var misCursos = this;
    misCursos.bCourseDisplay = false;
    misCursos.currentView = '';

    $scope.estudianteActual = {};
    $scope.modalEval = [];
    $scope.oEditPointer = {};

    $rootScope.courses = {};

    $http.get('json/estudiantesEquipo.json').success(function (data) {
      $scope.estudianteActual = data;
      console.log($scope.estudianteActual);
    });

    $http.get('json/rubrica.json').success(function (data) {
      $scope.rubrica = data;
    });

    $scope.guardarInfoEquipo = function(curso){
    	//logica para guardar datos de equipo
    }

    $scope.toogleInfo = function(estado){
      if(estado)
      {
        return false;
      }
      return true;
    }

    $scope.editEval = function (pStudent) {
    	console.log(pStudent);
      $scope.oEditPointer = pStudent;

      if (pStudent.evaluacion[0]) {
        $scope.modalEval = pStudent.evaluacion;
      } else {
        $scope.modalEval = angular.copy($scope.rubrica);
      }
    }

    $scope.saveEval = function () {
      var evalTemp = angular.copy($scope.modalEval);
      $scope.oEditPointer.evaluacion = evalTemp;
      $("#modalIntegrante").modal('hide');
    }

    $scope.courseDisplayToggle = function (psViewSwitch) {
      if (psViewSwitch !== misCursos.currentView) {
        misCursos.currentView = psViewSwitch;
        return true;
      } else {
        misCursos.currentView = '';
        return false;
      }
    };

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
        $http.get('json/rubrica.json').success(function (data) {
          $scope.rubrica = data;
          console.log($scope.estudianteActual);
         });
      }],
      controllerAs: 'modalCntrl'
    };
  });

})();