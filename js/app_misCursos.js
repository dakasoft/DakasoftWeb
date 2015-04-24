(function () { // define funcionalidad
  var app = angular.module('misCursos', ["ui.router"]);


  app.controller('misCursos', ['$rootScope','$scope','$http','funciones', function ($rootScope,$scope,$http,funciones) {

    $scope.grupos = {};
    $scope.entidad = "";

    $http.post('php/gruposPorEstudiante.php',{ "data" : $rootScope.currentUser.id }).success(function (data) {
      $scope.grupos = data;
    });

    $scope.toogleInfo = function(grupo,view,estado){  
      $scope.grupoActual = grupo;
      if(view=="informacion"){
        grupo.ests = false;
        grupo.eqps = false;
        grupo.rol = false;
      }else if(view=="eqps"){
        grupo.ests = false;
        grupo.informacion = false;
        grupo.rol = false;
      }
      if(estado){
        return false;
      }else{
        return true; 
      }
    }

    $scope.guardarEvaluacion = function(grupo){
      if($scope.rubricaForm.$valid){
        //traer estudiante grupo
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
          var nota ={Nota:$scope.nota,IdEstudiantePorGrupo:$scope.IdEstudiantePorGrupo} 
          $http.post("php/guardarNotaFactorHumano.php", { "data" : nota})
          .success(function(data) { 
            funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
            setTimeout(function(){$("#modalIntegrante").modal('hide')},1000); 
          })
          
        })    


      }else{
        funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes ingresar valores válidos',3500);
      }

    }

    $scope.editarEvaluacion = function(grupo,estudiante){
        $scope.grupoEditable = grupo;
        funciones.closeC();
        grupo.IdEstudianteEvaluado = estudiante.id;
        $http.post("php/rubrosFactorPorRubrica.php", { "data" : grupo.IdRubricaEvaluacion})
         .success(function(data) {
          grupo.Rubros=data;
        })
    };
    

  }]);

  app.directive('navCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/navCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('modalMiEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/modalEquipo.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('miEquipo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/miEquipo.html',
      controller: ['$rootScope','$scope','$http',function ($rootScope,$scope,$http) {
      $scope.grupoActual.IdEstudiante =  $rootScope.currentUser.id;
      $http.post("php/estudianteConEquipoEnGrupo.php", { "data" : $scope.grupoActual})
      .success(function(data) {
        $scope.grupoActual.Equipo = data.Nombre;
        $scope.grupoActual.Mision = data.Vision;
        $scope.grupoActual.Vision = data.Mision;
        $scope.grupoActual.IdEquipo = data.IdEquipo;
        $http.post("php/estudiantesPorEquipo.php", { "data" : data.IdEquipo})
        .success(function(data) {
            $scope.grupoActual.Integrantes = data; 
         })
       })

      }],
      controllerAs: 'modalCntrl'
    };
  });

  app.directive('miCurso',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/misCursos/miCurso.html',
      controller: ['$scope','$http',function ($scope,$http) {

      }],
      controllerAs: 'modalCntrl'
    };
  });

})();