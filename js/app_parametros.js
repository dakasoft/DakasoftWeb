(function () { // define funcionalidad
  var app = angular.module('parametros', ["ui.router"]);

  app.directive('parametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/parametrosP.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.votaciones = [];
        $scope.votacion = funciones.votacion();

           $http.get('php/parametrosListar.php')
          .success(function (data) {
            $scope.votaciones = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });

        $scope.editar = function(votacion){
          $scope.votacion =  angular.copy(votacion);
          //anno,mes,dia
          var Fecha = $scope.votacion.FechaRecepcion.split('-');
          var FechaCierre  = $scope.votacion.FechaCierre.split('-');
          $scope.votacion.FechaRecepcion = new Date(Fecha[0], Fecha[1], Fecha[2]);

          $scope.votacion.FechaCierre = new Date(FechaCierre[0], FechaCierre[1], FechaCierre[2]);
          $scope.accion = "Editar";
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.votacion = funciones.votacion();
          $scope.accion = "Nuevo";
          
        };

        $scope.guardar = function(votacion) {
          if($scope.votacionForm.$valid){
             if(votacion.id ==""){               
                  votacion.FechaRecepcion = $scope.obtenerFecha(votacion.FechaRecepcion);
                  votacion.FechaCierre = $scope.obtenerFecha(votacion.FechaCierre);
                  votacion.FechaInicio = $scope.obtenerFecha(new Date());
               $http.post("php/crearParametros.php", { "data" : votacion})
              .success(function(data) {
                   console.log(data.Insert_Id);
                votacion.id=data.Insert_Id;
                      console.log(votacion.id);
                $http.post("php/parametroDesactivar.php", { "data" : data.Insert_Id})
              .success(function(data) {
                   console.log(data);
                    $scope.cambiarEstado(votacion);
                });
                 funciones.agregarALista($scope.votaciones,votacion);
                  funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                  setTimeout(function(){$("#modalVotacion").modal('hide')},1000);   
               });
              

             }else{
                  votacion.FechaRecepcion= $scope.obtenerFecha(votacion.FechaRecepcion);
                  votacion.FechaCierre = $scope.obtenerFecha(votacion.FechaCierre);
                  console.log(votacion);
              $http.post("php/parametrosModificar.php", { "data" : votacion})
              .success(function(data) {
                      $scope.cambiarEstado(votacion);
                   funciones.editarDeLista($scope.votaciones,votacion);
                  funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                  setTimeout(function(){$("#modalVotacion").modal('hide')},1000);  
               });

             }

          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }

        };
        $scope.cambiarEstado = function(votacion){
         angular.forEach($scope.votaciones,function(value,key){
          console.log(votacion.id);
            if(value.id == votacion.id){
                votacion.Activo = 1;
            }else{
               value.Activo = 0;
            }

         });
             console.log($scope.votaciones);
        }

        $scope.obtenerFecha = function(Fecha){
          var dia=Fecha.getDate();
          var mes=Fecha.getMonth();
          var año=Fecha.getFullYear();
          FechaObtenida = año+"-"+mes+"-"+dia;
          return FechaObtenida;
        }

      }]
    };
  });

  app.directive('modalParametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/modalParametros.html'
    };
  });


})();