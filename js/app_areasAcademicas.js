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

    $scope.editArea = function (pArea) {
      funciones.closeC();
      $scope.modalArea = angular.copy(pArea);
    };

    $scope.saveArea = function (pArea) {
      var bExistence = funciones.repeatCheck($scope.areasAcademicas, pArea, 'Codigo');
      if ($scope.formArea.$valid) {
        if (pArea.id === "") {
          if (!bExistence) {
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
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> El codigo ingresado ya existe',3500);
          }
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
        funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
        if (!pArea.Codigo || !pArea.Nombre) {
          funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
        } else {
          if (pArea.Codigo === undefined){
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> El Codigo ingresado no es válido',3500);
          }
        }
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