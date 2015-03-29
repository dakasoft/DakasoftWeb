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
          //Si ésta función lo que valida está bien agrege la nueva fila.
          //La función valida que la suma no sea mayor de 100
          //El scope tiene el array y valor que se va a meter
          if(esValidoMaxValorRubro($scope)){

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
              alert('La suma de los valores no puede ser mayor a 100');
          }

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

         function esValidoMaxValorRubro($scope){
          var suma = 0;
          var esValido = true;
          var arrayRubros = $scope.rubrosSeleccionados;
          var nuevoValor = $scope.rubroValor;

          for(var i = 0; i < arrayRubros.length; i++){
            suma +=  parseInt(arrayRubros[i].valor);
          }
          suma +=  parseInt(nuevoValor);
          
          if(suma > 100){
            esValido = false;
          }

          return esValido;
        }

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