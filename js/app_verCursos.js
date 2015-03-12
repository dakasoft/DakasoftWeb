(function () { // define funcionalidad
  var app = angular.module('verCursos', ["ui.router"]);


  app.controller('verCursos', ['$rootScope','$scope','$http', function ($rootScope, $scope,$http) {
    var verCursos = this;

    verCursos.bCourseDisplay = false;
    verCursos.currentView = '';

    $rootScope.courses = {};
    
    $scope.modalTeam = {};
    $scope.modalStudent = {};
    $scope.modalAssignment = {};
    $scope.oEditPointer = {};

    $scope.users = {};

    $http.get('json/usuarios.json').success(function (data) {
      $scope.users = data;
    });

    $http.get('json/vercursos.json').success(function (data) {
      console.log(data);
      $rootScope.courses = data;
    });

    $scope.courseDisplayToggle = function (psViewSwitch) {
      if (psViewSwitch !== verCursos.currentView) {
        verCursos.currentView = psViewSwitch;
        return true;
      } else {
        verCursos.currentView = '';
        return false;
      }
    };

    $scope.newTeam = function (pGroup) {
      $scope.oEditPointer = pGroup;
      $scope.modalTeam.id = '';
      $scope.modalTeam.name = '';
      $scope.modalTeam.logo = 'img/logomovile.png';
      $scope.modalTeam.mission = '';
      $scope.modalTeam.vision = '';
      $scope.modalTeam.integrantes = [];
    };

    $scope.saveNewTeam = function () {
      var teamTemp = angular.copy($scope.modalTeam);
      $scope.oEditPointer.push(teamTemp);
      $scope.modalTeam = {};
    };

    $scope.editTeam = function (pTeam) {
      $scope.oEditPointer = pTeam;
      $scope.modalTeam = angular.copy(pTeam);
    };

    $scope.saveTeam = function () {
      angular.forEach($scope.modalTeam, function (pValue, pKey) {
        $scope.oEditPointer[pKey] = pValue;
      });
      $scope.modalTeam = {};
    };

    $scope.deleteTeam = function (pGroup, pTeam) {
      angular.forEach(pGroup.teams, function (pValue, pKey) {
        if(pValue.id === pTeam.id){
          pGroup.teams.splice(pKey, 1);
        }
      });
    }

    $scope.addStudent = function(pStudent){
      var bValidStudent = true;

      angular.forEach($scope.modalTeam.integrantes, function (pValue, pKey) {
        if(pValue.id === pStudent.id){
          bValidStudent = false;
        }
      });

      if(bValidStudent){
        $scope.modalTeam.integrantes.push(pStudent);
      }
    };

    $scope.removeStudent = function(pStudent){
      angular.forEach($scope.modalTeam.integrantes, function (pValue, pKey) {
        if(pValue.id === pStudent.id){
          $scope.modalTeam.integrantes.splice(pKey, 1);
        }
      });
    };

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

  app.directive('modalVerNuevoEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerNuevoEquipo.html',
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