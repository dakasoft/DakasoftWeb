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

           $scope.agregarRubro = function(){
          if($scope.rubricaForm.$valid){
            $scope.rubricaForm.$setUntouched(true);
            $scope.rubricaForm.$setPristine(true);
            $(".css-form").removeClass("ng-dirty");
            var lastRubro = $scope.rubrosSeleccionados[$scope.rubrosSeleccionados.length - 1];
            var newId =  (lastRubro) ? lastRubro.id + 1 : 1;
            $scope.rubrosSeleccionados.push({ id:newId,nombre: $scope.rubroNombre, valor:$scope.rubroValor });
            $scope.rubroNombre = "";
            $scope.rubroValor = "";
          }else{
            $scope.rubricaForm.$setDirty();
          }

        };

         $scope.eliminarRubro = function(rubro){
          angular.forEach($scope.rubrosSeleccionados, function(value, key) {
            if(value.id == rubro.id){
              $scope.rubrosSeleccionados.splice(key, 1);
            }
          });
        };
        $scope.guardarRubrica = function(){
          $scope.editableGrupo.rubrica = $scope.rubrosSeleccionados
          $scope.rubrosSeleccionados = [];
          $("#modalRubricas").modal("hide");
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






        



     
  


