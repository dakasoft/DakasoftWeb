(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursosTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
      $scope.cursos = [];
      $scope.codigoSeleccionado= [];
      $scope.areasSeleccionadas= [];
      $scope.editableC = "";

        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });

         $scope.editar = function(curso){
          $scope.editableC = curso;
          $scope.nombre = curso.nombre;
          $scope.codigo = curso.cod;
        };

        $scope.borrar = function(curso){
          
          angular.forEach($scope.cursos, function(value, key) {
            if(value.id == curso.id){
               console.log(value.id);
              $scope.cursos.splice(key, 1);
            }
          });
        };
         
          $scope.agregar = function(){
           
          $scope.editableC = "";
          $scope.nombre = "";
          $scope.codigo = ""; 
        };
            $scope.agregarArea = function(area){
          $scope.areasSeleccionadas.push({nombre: area});
          $scope.area="";
    
        };
         $scope.borrarArea = function(area){
          angular.forEach($scope.areasSeleccionadas, function(value, key) {
               console.log(value);
            if(value.nombre == area.nombre){
             $scope.areasSeleccionadas.splice(key, 1);
            }
          });
        };

          $scope.guardar = function(){
          
          if($scope.editableC != ""){
              angular.forEach($scope.cursos, function(value, key) {
              if(value.id == $scope.cursos.id){
                $scope.codigo = value.label;
              }
            });
            $scope.editableC.nombre = $scope.nombre;
            $scope.editableC.cod = $scope.codigo;
          }

          else{
            var lastUser = $scope.cursos[$scope.cursos.length - 1];
            var newId =  lastUser.id+1;
             angular.forEach($scope.codigo, function(value, key) {
              if(value.id == $scope.codigo){
                $scope.cursos = value.label;
              }
            });
            $scope.cursos.push({id:newId,nombre: $scope.nombre,cod:$scope.codigo
            });
          
          }
        $("#editModal").modal('hide');
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

})();
