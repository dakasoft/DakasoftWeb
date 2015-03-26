(function () { // define funcionalidad
  var app = angular.module('rubricasfh', ["ui.router"]);

  app.directive('rubricasFactorH',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricasFactorH.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.factorHumano = [];
        $scope.rubrosSeleccionados = [];
      
      
        $http.get('json/rubricaFH.json').success(function (data) {
          $scope.factorHumano = data;
        });
        $scope.editar = function(grupoRubrica){
          //objeto scope para validación
          $scope.rubricaForm.$setUntouched(true);
          $scope.rubricaForm.$setPristine(true);
          //objeto scope que contiene los dos objetos del array rubrica
          $scope.editableGrupo = grupoRubrica;
          //objeto scope donde meto el id de cada objeto de la rubrica
          $scope.rubrosSeleccionados = angular.copy(grupoRubrica.rubrica);
        };
        
      }],
      controllerAs: 'factorH'
    };
  });

  // ModalDialog
 app.directive('modalRubricas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalRubricas.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalFactorRubricas'
    };
});


     
  



})();