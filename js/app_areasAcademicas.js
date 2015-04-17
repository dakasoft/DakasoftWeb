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
        if (pArea.id === "") {
          $http.post("php/crearAreasAcademicas.php", {"data": pArea})
            .success(function (data) {
              pArea.id = parseInt(data.Insert_Id);
              funciones.agregarALista($scope.areasAcademicas, pArea);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalArea").modal('hide')},1000);
            })
            .error(function(data, status) {
              return false;
            });
        } else {
          $http.post("php/modificarAreasAcademicas.php", {"data": pArea})
            .success(function (data) {
              $scope.areasAcademicas = funciones.editarDeLista($scope.areasAcademicas, pArea);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalArea").modal('hide')},1000);   
            })
            .error(function(data, status) {
              return false;
             });
        }
      } else {
        console.log($scope.modalArea);
        return false;
      }
    };

    $scope.deleteArea = function (pArea) {
      $scope.deletePointer = pArea;
      $scope.deleteContainer = $scope.areasAcademicas;
    }

    $scope.borrar = function () {
      $http.post("php/borrarAreasAcademicas.php", {"data": $scope.deletePointer})
          .success(function(data) {
            $scope.areasAcademicas = funciones.borrarDeLista($scope.deleteContainer, $scope.deletePointer);
           })
          .error(function(data, status) {
              return false;
           });      
          $("#modalConfirm").modal('hide');
        };
  }]);

  app.directive('areasAcademicas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/areasAcademicas/areasAcademicas.html',
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