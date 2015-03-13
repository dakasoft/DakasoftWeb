(function () { // define funcionalidad
  var app = angular.module('verCursos', ["ui.router"]);


  app.controller('verCursos', ['$rootScope','$scope','$http', function ($rootScope, $scope,$http) {
    var verCursos = this;

    verCursos.bCourseDisplay = false;
    verCursos.currentView = '';

    $rootScope.courses = {};
    
    $scope.modalTeam = {};
    $scope.modalEval = {};
    $scope.modalAssignment = {};
    $scope.oEditPointer = {};

    $scope.users = {};
    $scope.idCounter = 0;
    $scope.bShowReceived = false;

    $http.get('json/usuarios.json').success(function (data) {
      $scope.users = data;
    });

    $http.get('json/vercursos.json').success(function (data) {
      $rootScope.courses = data;
    });

    $http.get('json/verrubrica.json').success(function (data) {
      $scope.rubrica = data;
    });

    $scope.newAssignment = function (pGrupo) {
      $scope.oEditPointer = pGrupo;
    }

    $scope.addAssignment = function () {
      var assignmentTemp = angular.copy($scope.modalAssignment);
      if ($scope.modalAssignment.name && $scope.modalAssignment.start && $scope.modalAssignment.end) {
        $scope.oEditPointer.entregas.push(assignmentTemp);
        $scope.modalAssignment = {};
      } else {
        return false;
      }
    }

    $scope.editEval = function (pStudent) {
      $scope.oEditPointer = pStudent;
      if (true) {

      };
      $scope.modalEval = $scope.rubrica;
    }

    $scope.saveEval = function () {
      var evalTemp = angular.copy($scope.modalEval);
      $scope.oEditPointer = evalTemp;
      $scope.modalEval = {};
    }

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
      $scope.modalTeam.id = $scope.newID();
      $scope.modalTeam.name = '';
      $scope.modalTeam.logo = 'img/logomovile.png';
      $scope.modalTeam.mission = '';
      $scope.modalTeam.vision = '';
      $scope.modalTeam.integrantes = [];
    };

    $scope.saveNewTeam = function () {
      var teamTemp = angular.copy($scope.modalTeam);
      if ($scope.modalTeam.name) {
        $scope.oEditPointer.teams.push(teamTemp);
        $scope.modalTeam = {};
      } else {
        return false;
      }
    };

    $scope.editTeam = function (pTeam) {
      $scope.oEditPointer = pTeam;
      $scope.modalTeam = angular.copy(pTeam);
    };

    $scope.saveTeam = function () {
      if ($scope.modalTeam.name) {
        angular.forEach($scope.modalTeam, function (pValue, pKey) {
          $scope.oEditPointer[pKey] = pValue;
        });
        $scope.modalTeam = {};
      } else {
        return false;
      }
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

    $scope.removeStudent = function (pStudent){
      angular.forEach($scope.modalTeam.integrantes, function (pValue, pKey) {
        if(pValue.id === pStudent.id){
          $scope.modalTeam.integrantes.splice(pKey, 1);
        }
      });
    };

    $scope.newID = function () {
      $scope.idCounter = $scope.idCounter + 1;
      return $scope.idCounter;
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