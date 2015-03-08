(function () { // define funcionalidad
  var app = angular.module('cursos', ["ui.router"]);

  app.directive('cursosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/cursosTabla.html',
      controller: ['$scope','$http',function ($scope,$http) {
      $scope.cursos = [];
        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });
         $scope.editar = function(curso){

          $scope.editableC = carrera;
          $scope.nombre = carrera.nombre;
          $scope.codigo = carrera.cod;
        };

        $scope.borrar = function(curso){
          
          angular.forEach($scope.carreras, function(value, key) {
            if(value.id == carrera.id){
               console.log(value.id);
              $scope.carreras.splice(key, 1);
            }
          });
        };
         
          $scope.agregar = function(){
           
          $scope.editableC = "";
          $scope.nombre = "";
          $scope.codigo = ""; 
        };
           

           $scope.guardar = function(){
          if($scope.editableC != ""){
            $scope.editableC.nombre = $scope.nombre;
            $scope.editableC.cod = $scope.codigo;
          }else{
            var lastUser = $scope.carreras[$scope.carreras.length - 1];
            var newId =  lastUser.id+1;
            /* each temporal para mostrar rol*/
            $scope.carreras.push({id:newId,nombre: $scope.nombre,cod:$scope.codigo,cursos :$scope.cursosSeleccionados
            });
          
          }
        $("#editModal").modal('hide');
        };
      }],
      controllerAs: 'curso'
    };
  });

    app.directive('modalCursos',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalCarreras.html',
      controller: ['$scope','$http',function ($scope,$http) {
       
        
      }],
        controllerAs: 'modalC'
    };
});

})();
