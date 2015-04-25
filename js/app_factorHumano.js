(function () { // define funcionalidad
  var app = angular.module('factorHumano', ["ui.router"]);

  app.directive('factorHumano',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/factorHumano/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.grupos = [];
        $scope.rubrosSeleccionados = [];
        $scope.rubro = funciones.rubro();
        
        // json php
        /* Listar grupos*/
        $http.get('php/listargrupoconcurso.php')
          .success(function (data) {
            $scope.grupos = data;
            //console.log(data)
          })
          .error(function(data,status){
            result = data || "jiji"
          });
        
        
        // Funciones
        
        //editar
        $scope.editar = function(grupo){
          funciones.closeC();
          $scope.rubro = funciones.rubro();
          $scope.grupo =  angular.copy(grupo);
          $scope.grupo.rubricaFactor = [];
          $scope.accion = "Editar";
          //si tiene id rubrica buscar rubros
          console.log(grupo)
        };

        //agregar rubro
        $scope.agregarRubro = function(rubro){
          if($scope.rubricaForm.$valid){
              $scope.rubro = funciones.rubro();
              var newRubro = angular.copy(rubro);
              funciones.agregarAListaNoRepetidoPorNombre($scope.grupo.rubricaFactor,newRubro);
              funciones.closeC();

            // }//Valida
          }//fin rubri form
          else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);
          }
        };
        //eliminar rubro
        $scope.eliminarRubro = function(rubro){
          funciones.borrarDeListaPorNombre($scope.grupo.rubricaFactor,rubro);
        };

        //gardar en base de datos la rubrica de grupo obj
        $scope.guardar = function(grupo){
          if(grupo.Rubrica!=""){
            $scope.grupo = grupo;
            $scope.rubros = [];
            $scope.rubricaId = 0;
            
            //1)--Primero se crea la rubrica
            $http.post('php/crearRubricaFactorH.php',{"data" : grupo})
              .success(function (data) {
                if (data.Insert_Id!="") {//nos devuelve el id que inserto
                  $scope.grupo.Rubrica = data.Insert_Id;
                  console.log($scope.grupo.Rubrica);
                  //2)--Guardar Rubrica
                  $http.post('php/guardarRubricaGrupo.php',{"data" : $scope.grupo})
                    .success(function (data) {
                      // $scope.grupo = data;
                      console.log(data)
                    }) 
                    .error(function(data, status) {
                        result = data || "Request failed";//hacer algo con esto.
                    }); 
                  

                  //3)--for que recorre los rubros. Esta parte se meteran lo rubro 
                  $scope.rubricaId = data.Insert_Id;
                  
                  for (var i = grupo.rubricaFactor.length - 1; i >= 0; i--) { 
                  //Se crean los rubros de evaluación
                  $http.post('php/guardarRubrosFH.php',{"data" : grupo.rubricaFactor[i]})
                  .success(function (rubro){  
                    console.log(grupo.rubricaFactor)
                    //Rubrica por rubro se fusionan los dos rubros
                    $http.post('php/guardarRubrosRubricaFH.php',{"data" : {rubrica:$scope.rubricaId,id:rubro.Insert_Id} })
                    .success(function (data) {
                      //$scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
                      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                      setTimeout(function(){$("#modalRubrica").modal('hide')},1000); 
                    })//success rubrica x rubro
                  })//success rubros for
                };//fin for

               
                
              };//Segundo if
              })//fin primer post success
          }//fin if1
          else{

          }

        };//fin funcion guardar
      }]//fin controlador
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
                    




                 
                      

                  






            
          


        

