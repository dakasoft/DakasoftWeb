(function () { // define funcionalidad
  var app = angular.module('proyectos', ["ui.router"]);

  app.directive('proyectosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosTabla.html',
      controller: ['$scope','$http','ngTableParams','funciones',function ($scope, $http, ngTableParams,funciones) {
        $scope.proyectos = [];
         $scope.nota = "";
        $scope.proyectosSeleccionados = [];
          $scope.editableProject = "";
          $http.get('php/listarProyectos.php')
          .success(function (data) {
             $scope.proyectos = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });
     $scope.agregarProyecto = function(proyecto){
      
             funciones.closeC();
                var ingresar = true;
                angular.forEach($scope.proyectosSeleccionados,function(value,key){
                  if(value.id == proyecto.id){
                    ingresar = false;
                  }
                });
                if(ingresar || $scope.proyectosSeleccionados.length == 0){
                   $scope.proyectosSeleccionados.push(proyecto);
                   $http.post("php/agregarProyectoE.php", { "data" : proyecto})
                  .success(function(data) {
                      $scope.proyectosE = data;
                   })
                  .error(function(data, status) {
                      result = data || "Request failed";//hacer algo con esto.
                   });     
                 }
          };

    $scope.EliminarProyecto=function(proyecto){
        angular.forEach($scope.proyectosSeleccionados, function(value, key) {
            if(value.id == proyecto.id){
              $scope.proyectosSeleccionados.splice(key, 1);
            }
          });

    }
     $scope.editarNota = function(proyecto){
      funciones.closeC();
      $scope.editableProject = proyecto;
      $scope.nota=$scope.editableProject.nota;
  


    }


    $scope.guardarnota = function(){
    if($scope.nota<=100){
         if($scope.nota<1){
            setTimeout(function(){$("#editModal").modal('hide')},1000);
         }
          else{
             $scope.editableProject.nota =angular.copy($scope.nota);
       funciones.closeC();
      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> Has agregado la nota',3500);
      setTimeout(function(){$("#editModal").modal('hide')},1000);


          }
    }
    else{
      funciones.closeC(); 
      funciones.alert("contentbody","danger",'<strong>'+"Ops!.."+'</strong> La nota debe ser menor igual 100',3500);
    
    }
    }


      }],
      controllerAs: 'proyectoCtrl'
    };
  });





  app.directive('modalProyecto',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/modalProyectos.html',
      controller: ['$scope','$http',function ($scope,$http) {
        
      }],
      controllerAs: 'modalProyecto'
    };
  });
  

})();