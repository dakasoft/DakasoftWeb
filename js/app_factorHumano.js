(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('factorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/factorHumano/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.grupos = [];
        $scope.rubrosSeleccionados = [];
        // $scope.rubro = funciones.rubro();
        
        // json php
        /* Listar grupos*/
        $http.get('php/listargrupoconcurso.php')
          .success(function (data) {
            $scope.grupos = data;
            console.log(data)
          })
          .error(function(data,status){
            result = data || "jiji"
          });

         /* Listar cursos*/
          $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });


        // $http.get('json/grupos.json').success(function (data) {
        //   $scope.grupos = data;
        // });

        // $scope.editar = function(grupo){
        //   funciones.closeC();
        //   $scope.rubro = funciones.rubro();
        //   $scope.grupo =  angular.copy(grupo);
        //   $scope.accion = "Editar";
        // };

        // $scope.guardar = function(grupo){
        //   $scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
        //   funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
        //   setTimeout(function(){$("#modalRubrica").modal('hide')},1000);  
        // };

        // $scope.agregarRubro = function(rubro){
        //   if($scope.rubricaForm.$valid){
        //     $scope.rubro = funciones.rubro();
        //     var newRubro = angular.copy(rubro);
        //     funciones.agregarAListaNoRepetidoPorNombre($scope.grupo.rubricaFactor,newRubro);
        //     funciones.closeC();
        //   }else{
        //     funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);
        //   }

        // };

        // $scope.eliminarRubro = function(rubro){
        //   funciones.borrarDeListaPorNombre($scope.grupo.rubricaFactor,rubro);
        // };

        // function esValidoMaxValorRubro($scope){
        //   var suma = 0;
        //   var esValido = true;
        //   var arrayRubros = $scope.rubrosSeleccionados;
        //   var nuevoValor = $scope.rubroValor;

        //   for(var i = 0; i < arrayRubros.length; i++){
        //     suma +=  parseInt(arrayRubros[i].valor);
        //   }
        //   suma +=  parseInt(nuevoValor);
          
        //   if(suma > 100){
        //     esValido = false;
        //     funciones.closeC(); 
        //     funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> La suma de los valores no debe ser mayor a 100',3500);
        //   }

        //   return esValido;
        // }
        
      }]
    };
  });


// ModalDialog
app.directive('modalRubrica',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/factorHumano/modalRubrica.html'
    };
});
     



})();