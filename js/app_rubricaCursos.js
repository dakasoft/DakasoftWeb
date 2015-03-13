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
          $scope.rubricaCursos = data;//nombre del json para llamarlo en el html
        });

       $scope.agregarRubro = function(){

          var lastRubro = $scope.rubrosSeleccionados[$scope.rubrosSeleccionados.length - 1];
          var newId =  lastRubro.id+1;
          
          // console.log($scope.rubrosSeleccionados)
          // console.log(lastRubro.id)
          // if ($scope.rubrosSeleccionados === 0) {
          //    console.log('vacio 2')
          // }
          
          console.log("rubroNombre");
          $scope.rubrosSeleccionados.push({ id:newId,nombre: $scope.rubroNombre, valor:$scope.rubroValor });
          $scope.rubroNombre = "";
          $scope.rubroValor = "";
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
        controllerAs: 'modalC'
    };
});
   
       
  



})();