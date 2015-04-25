(function () { // define funcionalidad
  var app = angular.module('verCursos', ["ui.router"]);


  app.controller('verCursos', ['$rootScope','$scope','$http','funciones', function ($rootScope, $scope,$http,funciones) {

    $scope.grupos = {};
    $scope.entidad = "";
    $http.post('php/gruposPorProfesor.php',{ "data" : $rootScope.currentUser.id }).success(function (data) {
      $scope.grupos = data;
    });

    /*prueba de concepto cambio de pestañas*/
    $scope.toogleInfo = function(grupo,view,estado){  
       $scope.grupoActual = grupo;
      if(view=="informacion"){
        grupo.ests = false;
        grupo.eqps = false;
        grupo.rol = false;
      }else if(view=="ests"){
        grupo.informacion = false;
        grupo.eqps = false;
        grupo.rol = false;
      }else if(view=="eqps"){
        grupo.ests = false;
        grupo.informacion = false;
        grupo.rol = false;
      }else if(view=="rol"){
        grupo.estudiantes = false;
        grupo.eqps = false;
        grupo.informacion = false;
      }

      if(estado){
        return false;
      }else{
        return true; 
      }
    
    }
    /*borrar para todos*/
    $scope.borrarObjeto= function(grupo,curso,entidad){
      $scope.objeto = curso;
      $scope.grupoBorrar = grupo;
      $scope.entidad = entidad;
    }

    $scope.borrar = function(){
      if($scope.entidad=="equipo"){
        /*borrado en cascada incompleto*/
        $scope.objeto.IdGrupo = $scope.grupoBorrar.id;
        $http.post("php/borrarEquipo.php", { "data" : $scope.objeto}) // 
        .success(function(data) {
            $scope.grupoBorrar.equipos=funciones.borrarDeLista($scope.grupoBorrar.equipos,$scope.objeto);
          })  
      }

      if($scope.entidad=="rol"){
        /*borrado en cascada incompleto*/
        $scope.objeto.IdGrupo = $scope.grupoBorrar.id;
        $http.post("php/borrarRolEstudiante.php", { "data" : $scope.objeto}) // 
        .success(function(data) {
            $scope.grupoBorrar.equipos=funciones.borrarDeLista($scope.grupoBorrar.equipos,$scope.objeto);
          })  
      }
      $("#modalConfirm").modal('hide');
    };   

     /*funciones de rol*/
    $scope.nuevoRol = function(grupo){
      funciones.closeC();
      $scope.rol = funciones.rol()
      $scope.accion = "Nuevo";
      $scope.grupoEditando = grupo;
      /*cargamos los datos respectivos de cada equipo*/
    }; 

    $scope.editarRol = function(grupo,rol){
      funciones.closeC();
      $scope.entidad = "equipo"
      $scope.grupoEditando = grupo;
      $scope.rol =  angular.copy(rol);
      $scope.accion = "Editar";
    };

    $scope.guardarRol = function(rol){
      if($scope.rolForm.$valid){
        if(rol.id==""){
          rol.IdGrupo = $scope.grupoEditando.id;
          $http.post("php/crearRolEquipo.php", { "data" : rol})
          .success(function(data) {
             if(data.Insert_Id != ""){
              rol.id = data.Insert_Id; 
              $http.post("php/rolParaGrupo.php", { "data" : rol})
              .success(function(data) {                    
                $scope.grupoEditando.roles = funciones.agregarAListaNoRepetido($scope.grupoEditando.roles,rol);
                funciones.alert("contentbody3","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalRol").modal('hide')},1000); 
               })
             }
           }) 
        }else{ //falta probar esto a ver si sirve
          $http.post("php/modificarRolEquipo.php", { "data" : rol})
          .success(function(data) {
            $scope.grupoEditando.roles = funciones.editarDeLista($scope.grupoEditando.roles,rol);
            funciones.alert("contentbody3","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
            setTimeout(function(){$("#modalRol").modal('hide')},1000);  
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           }); 
        }
      }else{
        funciones.alert("contentbody3","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
      }
    }
    /*funciones de equipo*/
    $scope.nuevoEquipo = function(grupo){
      funciones.closeC();
      $scope.equipo = funciones.equipo()
      $scope.accion = "Nuevo";
      $scope.grupoEditando = grupo;
      /*cargamos los datos respectivos de cada equipo*/
      $http.post('php/estudiantesPorGrupo.php',{ "data" : grupo.id }).success(function (data) {
        $scope.grupoEditando.estudiantes = data;
      });
      $http.post('php/rolesPorGrupo.php',{ "data" : grupo.id }).success(function (data) {
        $scope.grupoEditando.roles = data;
      });
    };

    $scope.editarEquipo = function(grupo,equipo){
      funciones.closeC();
      $scope.entidad = "equipo"
      $scope.grupoEditando = grupo;
      $scope.equipo =  angular.copy(equipo);
      $http.post("php/estudiantesPorEquipo.php", { "data" : $scope.equipo.id})
      .success(function(data) {
        $scope.equipo.Integrantes = data; // duda
       })

      $http.post('php/estudiantesPorGrupo.php',{ "data" : grupo.id }).success(function (data) {
        $scope.grupoEditando.estudiantes = data;
      });
      
      $http.post('php/rolesPorGrupo.php',{ "data" : grupo.id }).success(function (data) {
        $scope.grupoEditando.roles = data;
      });
      $scope.accion = "Editar";
    };

    $scope.guardarEquipo = function(equipo){
      if($scope.equipoForm.$valid){
        if(equipo.id==""){
          equipo.IdGrupo = $scope.grupoEditando.id;
          $http.post("php/crearEquipo.php", { "data" : equipo})
          .success(function(data) {
             if(data.Insert_Id != ""){
              equipo.id = data.Insert_Id; 
              $http.post("php/equipoParaGrupo.php", { "data" : equipo})
              .success(function(data) {                    
               })
              $http.post("php/guardarIntegrantes.php", { "data" : equipo})
              .success(function(data) {                    
                $scope.grupoEditando.equipos = funciones.agregarAListaNoRepetido($scope.grupoEditando.equipos,equipo);
                funciones.alert("contentbody1","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                setTimeout(function(){$("#modalEquipo").modal('hide')},1000);  
               })
             }
           }) 
        }else{ //falta probar esto a ver si sirve
          $http.post("php/modificarEquipoGrupo.php", { "data" : equipo})
          .success(function(data) {
            $scope.grupoEditando.equipos = funciones.editarDeLista($scope.grupoEditando.equipos,equipo);
            funciones.alert("contentbody1","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
            setTimeout(function(){$("#modalEquipo").modal('hide')},1000);  
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           }); 
        }
      }else{
        funciones.alert("contentbody1","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
      }
    }

    $scope.agregarEstudiante = function(estudiante){
      funciones.agregarAListaNoRepetido($scope.equipo.Integrantes,estudiante);
    };

    $scope.borrarEstudiante = function(estudiante){
      $scope.equipo.Integrantes = funciones.borrarDeLista($scope.equipo.Integrantes,estudiante); 
    };

    /*evaluacion de nota*/
    $scope.editarEvaluacion = function(grupo,estudiante){
      
        $scope.grupoEditable = grupo;
        funciones.closeC();
        grupo.IdEstudianteEvaluado = estudiante.id;
        $http.post("php/rubrosPorRubrica.php", { "data" : grupo.Rubrica})
         .success(function(data) {
          grupo.Rubros=data;
        })
    };

    $scope.guardarEvaluacion = function(grupo,estudiante){
      if($scope.rubricaForm.$valid){
        $scope.nota = 0;  
        $scope.IdEstudiantePorGrupo = 0;
        $http.post("php/estudianteFactorGrupo.php", { "data" : grupo})
          .success(function(data) {  
          $scope.IdEstudiantePorGrupo = data.IdEstudiantePorGrupo;  
          for (var i = grupo.Rubros.length - 1; i >= 0; i--) {
            grupo.Rubros[i].IdEstudiantePorGrupo = data.IdEstudiantePorGrupo;
            $scope.nota += grupo.Rubros[i].valor;
            //$http.post("php/guardarEvaluacionFactor.php", { "data" : grupo.Rubros[i]})
            //.success(function(data) {

            //})
          };
          var notaev = {Nota:$scope.nota,IdEstudiantePorGrupo:$scope.IdEstudiantePorGrupo} 
          $http.post("php/guardarNotaEvaluacion.php", { "data" : notaev})
          .success(function(data) { 
            console.log(data);
            funciones.alert("contentbody2","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
            setTimeout(function(){$("#modalRubrica").modal('hide')},1000); 
          })
          
        })    
      }else{
        funciones.alert("contentbody2","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
      }

    }

    /*Entregas*/
    $scope.nuevaEntrega = function(grupo){
      $scope.grupoEditando = grupo;
      //$scope.equipo.Integrantes = funciones.borrarDeLista($scope.equipo.Integrantes,estudiante); 
    };

    $scope.guardarEntrega = function(entrega){
      console.log($scope.grupoEditando);
      if($scope.entregaForm.$valid){
        var entrega = {id:$scope.grupoEditando.id,Nombre:entrega.Nombre};
        $http.post("php/crearEntrega.php", { "data" : entrega})
           .success(function(data) {
            funciones.alert("contentbody4","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
            setTimeout(function(){$("#modalRubrica").modal('hide')},1000); 
          })
      }else{
        funciones.alert("contentbody2","danger",'<strong>'+"Ops!.."+'</strong>  Debes ingresar valores válidos',3500);
      }

    };
  }]);

  /*Prueba de concepto 2*/
  app.directive('verEstudiantes',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/verEstudiantes.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $http.post('php/estudiantesPorGrupo.php',{ "data" : $scope.grupoActual.id }).success(function (data) {
          $scope.grupoActual.estudiantes = data;
        });
      }]
    };
  });

  app.directive('verEquipos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/verEquipos.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $http.post('php/equiposPorGrupo.php',{ "data" : $scope.grupoActual.id }).success(function (data) {
         $scope.grupoActual.equipos = data;
        });
      }]
    };
  });

  app.directive('verRoles',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/verRoles.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $http.post('php/rolesPorGrupo.php',{ "data" : $scope.grupoActual.id }).success(function (data) {
         $scope.grupoActual.roles = data;
        });
      }]
    };
  });

  app.directive('verEntregas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/verEntregas.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $http.post('php/cargarEntregasGrupo.php',{ "data" : $scope.grupoActual.id }).success(function (data) {
          console.log(data);
         $scope.grupoActual.entregas = data;
        });
      }]
    };
  });


/*otros feos*/

  app.directive('navVerCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/navVerCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/modalEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalRubricaEv',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/modalRubricaEv.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalRolEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/modalRolEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalNuevaEntrega',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/verCursos/modalNuevaEntrega.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

/*
  app.directive('modalVerConfig',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerConfig.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalVerRubrica',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerRubrica.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });



  app.directive('modalVerConfirmacion',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalVerConfirmacion.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });
*/

})();