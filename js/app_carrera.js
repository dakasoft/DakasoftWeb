(function () { // define funcionalidad
  var app = angular.module('carreras', ["ui.router"]);

  app.directive('carrerasTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carrerasTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        var inputN = angular.element(".inputNombre");
        var inputC = angular.element(".inputCodigo");
        var mensaje1 = angular.element(".mensaje1");
        var mensaje2 = angular.element(".mensaje2");
        $scope.carrera = [];
        $scope.cursos = [];
        $scope.cursosSeleccionados = [];
        $scope.editableC = "";
        $scope.temporal = "";
        $http.get('json/carreras.json').success(function (data) {
          $scope.carreras = data;

        });
        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });
         $scope.editar = function(carrera){
            inputC.removeClass("error");
            mensaje2.css("display","none");
          $scope.editableC = carrera;
          $scope.nombre = carrera.nombre;
          $scope.codigo = carrera.cod;
          $scope.cursosSeleccionados = angular.copy(carrera.cursos);
        };

        $scope.borrar = function(carrera){
          
          angular.forEach($scope.carreras, function(value, key) {
            if(value.id == $scope.temporal.id){
               console.log(value.id);
              $scope.carreras.splice(key, 1);
            }
          });
        };

        $scope.borrarCurso = function(curso){
          angular.forEach($scope.cursosSeleccionados, function(value, key) {
            if(value.id == curso.id){
               console.log(value.id);
              $scope.cursosSeleccionados.splice(key, 1);
            }
          });
        };

        $scope.agregar = function(){
           inputC.removeClass("error");
            mensaje2.css("display","none");
          $scope.cursosSeleccionados = [];
          $scope.editableC = "";
          $scope.nombre = "";
          $scope.codigo = ""; 
        };

        $scope.agregarCurso = function(){
          angular.forEach($scope.cursos, function(value, key) {
            if(value.id == $scope.curso){
              $scope.curso = value.nombre;
              $scope.cursoId = value.id;
            }
          });
          if($scope.cursos){
            var ingresar = true;
            angular.forEach($scope.cursosSeleccionados,function(value,key){
              if(value.id == $scope.cursoId){
                ingresar = false;
              }
               });
            if(ingresar || $scope.profesoresSeleccionados.length == 0){
               $scope.cursosSeleccionados.push({id: $scope.cursoId, nombre:  $scope.curso });
              $scope.profesor = "";
            }

          }
        };

        $scope.eliminarTemporal = function(carrera){
                $scope.temporal = carrera;
        }

           $scope.guardar = function(){
            if(!$scope.nombre || !$scope.codigo){  
               if(!$scope.codigo){
               inputC.addClass("error");
               mensaje2.css("display","block");
                }
               if(!$scope.nombre){
               inputN.addClass("error");
               mensaje1.css("display","block");
               }

            }
          
            else{
                if($scope.editableC != ""){
                 $scope.editableC.nombre = $scope.nombre;
                $scope.editableC.cod = $scope.codigo;
                $scope.editableC.cursos = $scope.cursosSeleccionados;
             }
            else{
                 var lastUser = $scope.carreras[$scope.carreras.length - 1];
                   if(lastUser){
                       var newId =  lastUser.id+1; 
                     }
                   else{ 
                    var newId = 1
                    }
            /* each temporal para mostrar rol*/
                $scope.carreras.push({id:newId,nombre: $scope.nombre,cod:$scope.codigo,cursos :$scope.cursosSeleccionados
                  });
          
              }
                $("#editModal").modal('hide');
          } 
        };
      }],
      controllerAs: 'carreras'
    };
  });

    app.directive('modalc',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalCarreras.html',
      controller: ['$scope','$http',function ($scope,$http) {
       
        
      }],
        controllerAs: 'modalC'
    };
});


      app.directive('modalConfirm',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalConfirmaciont.html',
      controller: ['$scope','$http',function ($scope,$http) {
        
      }],
      controllerAs: 'modalConfirm'
    };
  });


})();