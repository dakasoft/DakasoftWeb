(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursosTabla.html',
      controller: ['$scope','$http','funciones',function ($scope,$http,funciones) {
        $scope.temporal = "";
      $scope.cursos = [];
      $scope.codigoSeleccionado= [];
      $scope.areasSeleccionadas= [];
      $scope.editableC = "";

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });

         $scope.editar = function(curso){
           funciones.closeC();
          $scope.editableC = curso;
          $scope.nombre = curso.nombre;
          $scope.codigo = curso.cod;
          $scope.area = curso.area.nombre;
          $scope.areasSeleccionadas = angular.copy(curso.area);
        };

        $scope.borrar = function(curso){
          
          angular.forEach($scope.cursos, function(value, key) {
            if(value.id == $scope.temporal.id){
              $scope.cursos.splice(key, 1);
            }
          });
             $("#modalConfirm").modal('hide');
        };
          $scope.eliminarTemporal = function(carrera){
                $scope.temporal = carrera;
        }
          $scope.agregar = function(){
             funciones.closeC();
           $scope.area="";
            $scope.areasSeleccionadas=[];
          $scope.editableC = "";
          $scope.nombre = "";
          $scope.codigo = ""; 
        };
            $scope.agregarArea = function(area){
              if(area){
                $scope.areasSeleccionadas.push({nombre: area});
                 $scope.area="";

              }
    
        };
         $scope.borrarArea = function(area){
          angular.forEach($scope.areasSeleccionadas, function(value, key) {
            if(value.nombre == area.nombre){
             $scope.areasSeleccionadas.splice(key, 1);
            }
          });
        };

          $scope.guardar = function(){
            if(!$scope.nombre || !$scope.codigo){  
            funciones.closeC(); 
            funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> Debes llenar todos los campos',3500);

            }
            else{

               if($scope.editableC != ""){
              angular.forEach($scope.cursos, function(value, key) {
              if(value.id == $scope.cursos.id){
                $scope.codigo = value.label;
              }
            });
            $scope.editableC.nombre = $scope.nombre;
            $scope.editableC.cod = $scope.codigo;
            $scope.editableC.area =$scope.areasSeleccionadas;
          }

            else{
            var lastUser = $scope.cursos[$scope.cursos.length - 1];
            var newId =  lastUser.id+1;
             angular.forEach($scope.codigo, function(value, key) {
              if(value.id == $scope.codigo){
                $scope.cursos = value.label;
              }
            });
            $scope.cursos.push({id:newId,nombre: $scope.nombre,cod:$scope.codigo,area :$scope.areasSeleccionadas
            });
             funciones.closeC();
              funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
          
          }
   setTimeout(function(){$("#editModal").modal('hide')},1000);


            }
          
         

        };
      }],
      controllerAs: 'curso'
    };
  });

    app.directive('modalCurso',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalCursos.html',
      controller: ['$scope','$http',function ($scope,$http) {
       
        
      }],
        controllerAs: 'modalCurso'
    };
});
    app.directive('modalConfirmc',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalConfirmaciont.html',
      controller: ['$scope','$http',function ($scope,$http) {
        
      }],
      controllerAs: 'modalConfirmc'
    };
  });

})();
