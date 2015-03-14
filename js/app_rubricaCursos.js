(function () { // define funcionalidad
  var app = angular.module('rubricaCursos', ["ui.router"]);
  
  app.directive('rubricaCursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricaCursosTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.rubricaCursos = [];
        $scope.rubrosSeleccionados = [];
      
        $http.get('json/rubricaCursos.json').success(function (data) {
          $scope.rubricaCursos = data;
        });

        $scope.editar = function(grupoRubrica){
          $scope.rubricaCursoForm.$setUntouched(true);
          $scope.rubricaCursoForm.$setPristine(true);
          $scope.editableGrupo = grupoRubrica;
          $scope.rubrosSeleccionados = angular.copy(grupoRubrica.rubrica);
        };

        $scope.agregarRubro = function(){
          if($scope.rubricaCursoForm.$valid){
            $scope.rubricaCursoForm.$setUntouched(true);
            $scope.rubricaCursoForm.$setPristine(true);

            var lastRubro = $scope.rubrosSeleccionados[$scope.rubrosSeleccionados.length - 1];
            var newId = 1;
            if(lastRubro != null){
               newId = lastRubro.id + 1;
            }
            $scope.rubrosSeleccionados.push({ id:newId,nombre: $scope.rubroNombre, valor:$scope.rubroValor });
            $scope.rubroNombre = "";
            $scope.rubroValor = "";
          }else{
            $scope.rubricaCursoForm.$setDirty();
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
          $("#modalRubrica").modal("hide");
        };
      }],
      controllerAs: 'factorH'
    };
  });
// ModalDialog
  app.directive('modalRubricaCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalRubricaCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalRubriCursos'
    };
});
   
       
  



})();