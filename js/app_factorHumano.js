(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('factorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricaFactorHumano.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.factorHumano = [];
        $scope.rubrosSeleccionados = [];
      
        $http.get('json/factorHumano.json').success(function (data) {
          $scope.factorHumano = data;
        });

        $scope.editar = function(grupoRubrica){
          $scope.editableGrupo = grupoRubrica;
          $scope.rubrosSeleccionados = angular.copy(grupoRubrica.rubrica);
        };

        $scope.agregarRubro = function(){
          console.log("rubroNombre");
          $scope.rubrosSeleccionados.push({ nombre: $scope.rubroNombre, valor:$scope.rubroValor });
          $scope.rubroNombre = "";
          $scope.rubroValor = "";
        };

        $scope.eliminarRubro = function(rubro){

          angular.forEach($scope.rubrosSeleccionados, function(value, key) {
            if(value.$$hashkey == rubro.$$hashkey){
              $scope.rubrosSeleccionados.splice(key, 1);
            }
          });

        };

        $scope.guardarRubrica = function(){
          $scope.editableGrupo.rubrica = $scope.rubrosSeleccionados
          $scope.rubrosSeleccionados = [];
          $("#modalRubrica").modal("hide");
        };




        
      }],
      controllerAs: 'factorH'
    };
  });


  // ModalDialog
  app.directive('modalRubrica',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalRubrica.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalC'
    };
});
   
       
  



})();