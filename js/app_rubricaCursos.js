(function () { // define funcionalidad
  var app = angular.module('rubricaCursos', ["ui.router"]);
  
  app.directive('rubricaCursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/evaluacion/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.rubricaCursos = [];
        $scope.rubrosSeleccionados = [];
        $scope.cursos = [];
      
        $http.get('json/rubricaCursos.json').success(function (data) {
          $scope.rubricaCursos = data;
        });


         /* Listar cursos*/
          $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });


        $scope.editar = function(grupoRubrica){
           funciones.closeC();
            $scope.rubroNombre = "";
             $scope.rubroValor = "";
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
          $scope.editableGrupo.rubrica = $scope.rubrosSeleccionados
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
  app.directive('modalRubricaCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/evaluacion/modalRubrica.html',
      controller: ['$scope','$http',function ($scope,$http) {     
      }],
        controllerAs: 'modalRubriCursos'
    };
});
   
       
  



})();