(function () { // define funcionalidad
  var app = angular.module('carreras', ["ui.router"]);

  app.directive('carrerasTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carreras/tabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope,$http,ngTableParams,funciones) {
        $scope.carreras = [];
        $scope.cursos = [];
        $scope.carrera = funciones.carrera();
        $scope.curso = funciones.curso();

        /*Get de usuarios y roles*/
        $http.get('php/listarCarreras.php')
          .success(function (data) {
            $scope.carreras = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });

        //pensado esto para q no se repitan, soy demasiado cool
        // creo que si pueden repetirse XD
        $http.get('php/listarCursos.php')
          .success(function (data) {
            $scope.cursos = data;;
          })
          .error(function(data,status){
            result = data || "jiji"
          });


        /*Funciones*/
        $scope.editar = function(carrera){
          funciones.closeC();
          $scope.carrera =  angular.copy(carrera);
          $http.post("php/listarCursosCarrera.php", { "data" : $scope.carrera})
          .success(function(data) {
            $scope.carrera.Cursos = data;
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           });     
          $scope.accion = "Editar";
        };

        $scope.borrarObjeto= function(carrera){
          $scope.carrera = carrera;
          $scope.entidad = "carrera";
        }

        $scope.borrar = function(){
          $http.post("php/borrarCarrera.php", { "data" : $scope.usuario})
          .success(function(data) {
            $scope.carreras=funciones.borrarDeLista($scope.carreras,$scope.carrera); 
           })
          .error(function(data, status) {
              result = data || "Request failed";//hacer algo con esto.
           });        
          $("#modalConfirm").modal('hide');
        };

        $scope.borrarCurso = function(curso){
          funciones.borrarDeLista($scope.carrera.Cursos,curso);
        };

        $scope.nuevo = function(){
          funciones.closeC();
          $scope.carrera = funciones.carrera()
          $scope.accion = "Nueva";
        };

        $scope.agregarCurso = function(curso){
          $scope.carrera.Cursos = funciones.agregarAListaNoRepetido($scope.carrera.Cursos,curso);
        };

        $scope.guardar = function(carrera){

          if($scope.carrerasForm.$valid){

            if(carrera.id==""){//es nuevo carrera
              //en este vamos a hacer los dos push a base de datos en php,
              //tanto de carerra como los cursos q esta tiene
              $http.post("php/crearCarrera.php", { "data" : $scope.carrera})
              .success(function(data) {
                  console.log(data);
                  carrera.id = parseInt(data.Insert_Id); //nos devuelve el id que inserto
                  $scope.carreras = funciones.agregarALista($scope.carreras,carrera);
                  funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                  setTimeout(function(){$("#modalUsuario").modal('hide')},1000);  
               })
              .error(function(data, status) {
                  result = data || "Request failed";//hacer algo con esto.
               }); 
            }else{ //Pending
              $scope.carreras = funciones.editarDeLista($scope.carreras,carrera);
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
              setTimeout(function(){$("#modalCarrera").modal('hide')},1000);  
            }

          }else{
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong>  Debes llenar todos los campos',3500);
          }  


        };
      }]
    };
  });

  app.directive('modalCarrera',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carreras/modalCarrera.html',
    };
  });

})();