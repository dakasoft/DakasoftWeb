(function () { // define funcionalidad
  var app = angular.module('parametros', ["ui.router"]);

  app.directive('parametros',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/parametros/parametrosP.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.votaciones = [];
        $scope.votacion = funciones.votacion();

        $http.get('json/votaciones.json').success(function (data) {
          $scope.votaciones = data;
        }); 

        $scope.editar = function(votacion){
          $scope.votacion =  angular.copy(votacion);
          //anno,mes,dia
          var fecha = $scope.votacion.fechaProyectos.split('/');
          var fechaCierre  = $scope.votacion.fechaCierre.split('/');
          $scope.votacion.fechaProyectos = new Date(fecha[2], fecha[1], fecha[0]);
          $scope.votacion.fechaCierre = new Date(fechaCierre[2], fechaCierre[1], fechaCierre[0]);
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
              votacion.id = funciones.nuevoId($scope.votaciones);
              votacion.fechaProyectos = $scope.obtenerFecha(votacion.fechaProyectos);
              votacion.fechaCierre = $scope.obtenerFecha(votacion.fechaCierre);
              votacion.fecha = $scope.obtenerFecha(new Date());
              funciones.agregarALista($scope.votaciones,votacion);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalVotacion").modal('hide')},1000);   

             }else{
              votacion.fechaProyectos= $scope.obtenerFecha(votacion.fechaProyectos);
              votacion.fechaCierre = $scope.obtenerFecha(votacion.fechaCierre);
              funciones.editarDeLista($scope.votaciones,votacion);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalVotacion").modal('hide')},1000); 
             }

          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }

        };
        $scope.cambiarEstado = function(votacion){
         angular.forEach($scope.votaciones,function(value,key){
            if(value.id == votacion.id){
                votacion.activo = 1;
            }else{
               value.activo = 0;
            }

         });
             console.log($scope.votaciones);
        }

        $scope.obtenerFecha = function(fecha){
          var dia=fecha.getDate();
          var mes=fecha.getMonth();
          var año=fecha.getFullYear();
          fechaObtenida = dia+"/"+mes+"/"+año;
          return fechaObtenida;
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