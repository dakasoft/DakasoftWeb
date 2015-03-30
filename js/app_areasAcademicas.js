(function () { // define funcionalidad
  var app = angular.module('areasAcademicas', ["ui.router"]);


  app.controller('areasController', ['$rootScope','$scope','$http', function ($rootScope, $scope,$http) {
    var areasCtrl = this;

    $rootScope.areasAcademicas = {};
    
    $scope.modalArea = {};
    $scope.modalEval = {};
    $scope.modalAssignment = {};
    $scope.oEditPointer = {};
    $scope.deletePointer = {};
    $scope.deleteContainer = {};

    $scope.users = {};
    $scope.idCounter = 0;
    $scope.bShowReceived = false;

    $http.get('json/areasAcademicas.json').success(function (data) {
      $scope.areasAcademicas = data;
      $scope.idCounter = data[data.length - 1].id;
    });

    $scope.confirmDelete = function () {
      angular.forEach($scope.deleteContainer, function (pValue, pKey) {
        if(pValue.id === $scope.deletePointer.id){
          $scope.deleteContainer.splice(pKey, 1);
        }
      });
    }

    $scope.newArea = function () {
      $scope.modalArea.id = $scope.newID();
      $scope.modalArea.name = '';
      $scope.modalArea.code = '';
    };

    $scope.saveNewArea = function () {
      var areaTemp = angular.copy($scope.modalArea);
      if ($scope.modalArea.name && $scope.modalArea.code) {
        $scope.areasAcademicas.push(areaTemp);
        $scope.modalArea = {};
        $("#modalAreaNew").modal('hide');
      } else {
        return false;
      }
    };

    $scope.editArea = function (pArea) {
      $scope.oEditPointer = pArea;
      $scope.modalArea = angular.copy(pArea);
    };

    $scope.saveArea = function () {
      if ($scope.modalArea.name && $scope.modalArea.code) {
        angular.forEach($scope.modalArea, function (pValue, pKey) {
          $scope.oEditPointer[pKey] = pValue;
        });
        $scope.modalArea = {};
        $("#modalArea").modal('hide');
      } else {
        return false;
      }
    };

    $scope.deleteArea = function (pTeam) {
      $scope.deletePointer = pTeam;
      $scope.deleteContainer = $scope.areasAcademicas;
    }

    $scope.newID = function () {
      $scope.idCounter = $scope.idCounter + 1;
      return $scope.idCounter;
    }

  }]);

  app.directive('areasAcademicas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/areasAcademicas.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalAreaNew',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalAreaNew.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalArea',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalArea.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalAreasConfirm',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalAreasConfirm.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();