(function () { // define funcionalidad
  var app = angular.module('areasAcademicas', ["ui.router"]);


  app.controller('areasController', ['$rootScope','$scope','$http','funciones','appServices', function ($rootScope, $scope, $http, funciones, appServices) {
    var areasCtrl = this;

    $scope.areasAcademicas = [];
    
    $scope.modalArea = {};
    $scope.modalEval = {};
    $scope.oEditPointer = {};
    $scope.deletePointer = {};
    $scope.deleteContainer = {};

    $scope.users = {};
    $scope.bShowReceived = false;

    $http.get('php/listarAreasAcademicas.php').success(function (data) {
      $scope.areasAcademicas = data;
    });

    $scope.newArea = function () {
      funciones.closeC();
      $scope.modalArea = funciones.areaAcademica();
    };

    $scope.saveArea = function (pArea) {
      if ($scope.formArea.$valid) {
        if (pArea.IdArea === "") {
          appServices.nuevaAreaAcademica(pArea);
        } else {
          // pArea.IdArea = parseInt(pArea.IdArea);
          // appServices.modifcarAreaAcademica(pArea);
        }
      } else {
        console.log($scope.modalArea);
        return false;
      }
    };

    $scope.confirmDelete = function () {
      angular.forEach($scope.deleteContainer, function (pValue, pKey) {
        if(pValue.id === $scope.deletePointer.id){
          $scope.deleteContainer.splice(pKey, 1);
        }
      });
    }

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
      templateUrl: 'templates/partials/areasAcademicas/modalAreaNew.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalArea',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/areasAcademicas/modalArea.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalAreasConfirm',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/areasAcademicas/modalAreasConfirm.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();