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
        
        /*Funciones*/


        $scope.editar = function(grupo){
          funciones.closeC();
          $scope.rubro = funciones.rubro();
          $scope.grupo =  angular.copy(grupo);
          $scope.grupo.rubricaFactor = [];
          $scope.accion = "Editar";
          //si tiene id rubrica buscar rubros
          console.log(grupo)
        };
        //gardar en bd grupo obj
        $scope.guardar = function(grupo){
          if(grupo.Rubrica!=""){
            $scope.grupo = grupo;
            $scope.rubros = [];
            $scope.rubricaId = 0;
            //se crea primero la rubrica
            $http.post('php/crearRubricaFactorH.php',{"data" : grupo})
              .success(function (data) {
                if (data.Insert_Id!="") {
                  $scope.grupo.Rubrica = data.Insert_Id;
                  
                  //guardar en grupo el id de esta rubrica
                  //hacer un post enviando grupo,
                  //desarmar el post en php y llamar a un pa con idrubrica y id del grupo
                  
                  //Guardar la rubrica
                  $http.post('php/guardarRubricaGrupo.php',{"data" : $scope.grupo})
                    .success(function (data) {
                      // $scope.grupo = data;
                      console.log(data)
                    }) 
                    .error(function(data, status) {
                        result = data || "Request failed";//hacer algo con esto.
                    }); 
                  

                  
                  $scope.rubricaId = data.Insert_Id;
                  for (var i = grupo.rubricaFactor.length - 1; i >= 0; i--) { 

                  $http.post('php/guardarRubrosFH.php',{"data" : grupo.rubricaFactor[i].nombre})

                  .success(function (rubro) {
                    //Rubrica por rubro se fusionan los dos rubros
                    $http.post('php/guardarRubrosRubricaFH.php',{"data" : {rubrica:$scope.rubricaId,id:rubro.Insert_Id} })
                    .success(function (data) {
                      //$scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
                      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                      setTimeout(function(){$("#modalRubrica").modal('hide')},1000); 
                    })
                  })//success
                };

                };//Segundo if
              })


            // $scope.rubros = [];
            //  $http.post('php/crearRubricaFactorH.php',{"data" : grupo})
            //   .success(function (data) {
            //     if (data.Insert_Id!="") {
            //       for (var i = grupo.rubricaFactor.length - 1; i >= 0; i--) {
            //         $scope.grupo.rubricaFactor[i].id="";
            //         $http.post('php/guardarRubrosFH.php',{"data" : grupo.rubricaFactor[i].nombre})
            //         .success(function (rubro) {
            //           console.log(rubro.Insert_Id);
            //           $scope.rubros.push(rubro.Insert_Id);
            //         }) 
            //       };
            //     };
            //     console.log($scope.rubros);
            //   })
            // .error(function(data,status){
            //   result = data || "jiji"
            // });
            
          }//fin if
          //$scope.grupos = funciones.editarDeLista($scope.grupos,grupo);
          //funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
          //setTimeout(function(){$("#modalRubrica").modal('hide')},1000);  
        };

        $scope.agregarRubro = function(rubro){
          if($scope.rubricaForm.$valid){
            // $scope.rubro = funciones.rubro();
            var newRubro = angular.copy(rubro);
            funciones.agregarAListaNoRepetidoPorNombre($scope.grupo.rubricaFactor,newRubro);
            funciones.closeC();
          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);
          }

        };

        $scope.eliminarRubro = function(rubro){
          funciones.borrarDeListaPorNombre($scope.grupo.rubricaFactor,rubro);
        };
        
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