(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('factorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/rubricaFactorHumano.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.factorHumano = [];
        $scope.rubrosSeleccionados = [];
      
        $http.get('json/factorHumano.json').success(function (data) {
          $scope.factorHumano = data;
        });

        $scope.editar = function(grupoRubrica){
          funciones.closeC();
            $scope.rubroNombre = "";
             $scope.rubroValor = "";
          $scope.rubricaForm.$setUntouched(true);
          $scope.rubricaForm.$setPristine(true);
          $scope.editableGrupo = grupoRubrica;
          $scope.rubrosSeleccionados = angular.copy(grupoRubrica.rubrica);
        };

        $scope.agregarRubro = function(){
          if($scope.rubricaForm.$valid){
            if(esValidoMaxValorRubro($scope)){
              $scope.rubricaForm.$setUntouched(true);
              $scope.rubricaForm.$setPristine(true);
              var lastRubro = $scope.rubrosSeleccionados[$scope.rubrosSeleccionados.length - 1];
              var newId =  (lastRubro) ? lastRubro.id + 1 : 1;
              $scope.rubrosSeleccionados.push({ id:newId,nombre: $scope.rubroNombre, valor:$scope.rubroValor });
              funciones.closeC();
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              $scope.rubroNombre = "";
              $scope.rubroValor = "";


            }else{
  
            }

          }else{
               funciones.closeC(); 
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);
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
          $scope.editableGrupo.rubrica = $scope.rubrosSeleccionados;
           setTimeout(function(){$("#modalRubrica").modal('hide')},1000);
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
            funciones.closeC(); 
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> La suma de los valores no debe ser mayor a 100',3500);
          }

          return esValido;
        }
        
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
        controllerAs: 'modalFactorRubrica'
    };
});
     



})();