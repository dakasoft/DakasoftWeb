(function () { // define funcionalidad
  var app = angular.module('verCursos', ["ui.router"]);


  app.controller('verCursos', ['$rootScope','$scope','$http', function ($rootScope, $scope,$http) {
    var verCursos = this;

    $scope.modalTeam = {}

    verCursos.bCourseDisplay = false;
    verCursos.currentView = '';
    $rootScope.courses = {};

    $http.get('json/vercursos.json').success(function (data) {
      console.log(data);
      $rootScope.courses = data;
    });

    $scope.showTeam = function (pTeam) {
      $scope.modalTeam = pTeam;
    }

    $scope.courseDisplayToggle = function (pView, pViewSwitch) {
      if (pViewSwitch === verCursos.currentView) {
        alert('potato');
        pView = false;
      } else {
        verCursos.currentView = pViewSwitch;
        pView = true;
      }
    }

  }]);

  app.directive('navVerCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/navVerCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalVerEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalVerConfig',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerConfig.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalVerRubrica',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerRubrica.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalNuevaEntrega',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalNuevaEntrega.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();