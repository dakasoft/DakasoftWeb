(function () { // define funcionalidad
  var app = angular.module('carreras', ["ui.router"]);

  app.directive('carrerasTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/carrerasTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.carrera = [];
        $scope.cursos = []
        $scope.editableC = "";
        $http.get('json/carreras.json').success(function (data) {
          $scope.carreras = data;

        });
        $http.get('json/cursos.json').success(function (data) {
          $scope.cursos = data;
        });
         $scope.editar = function(carrera){
          $scope.editableC = carrera;
          $scope.nombre = carrera.nombre;
          $scope.codigo = carrera.cod;
        };

        $scope.borrar = function(carrera){
          
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
            $scope.carreras.push({id:newId,nombre: $scope.nombre,cod:$scope.codigo
            });
          }
        $("#editModal").modal('hide');
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


})();