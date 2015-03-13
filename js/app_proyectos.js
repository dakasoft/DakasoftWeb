(function () { // define funcionalidad
  var app = angular.module('proyectos', ["ui.router"]);

  app.directive('proyectosTabla',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosTabla.html',
      controller: ['$scope','$http','ngTableParams',function ($scope, $http, ngTableParams) {
        var notainput= angular.element('#nota');
       var mensaje=angular.element('.mensaje');
        $scope.proyectos = [];
         $scope.nota = "";
        $scope.proyectosSeleccionados = [];
          $scope.editableProject = "";
        $http.get('json/proyectos.json').success(function (data) {
        $scope.proyectos = data;
        });
     $scope.agregarProyecto = function(proyecto){
                var ingresar = true;
                angular.forEach($scope.proyectosSeleccionados,function(value,key){
                  if(value.id == proyecto.id){
                    ingresar = false;
                  }
                });
                if(ingresar || $scope.proyectosSeleccionados.length == 0){
                   $scope.proyectosSeleccionados.push(proyecto);

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
         mensaje.css("display","none");
       notainput.removeClass( "error" );
      $scope.editableProject = proyecto;
      $scope.nota=$scope.editableProject.nota;
  


    }


    $scope.guardarnota = function(){
      mensaje.css("display","none");
       notainput.removeClass( "error" );
    if($scope.nota<=100){
      $scope.editableProject.nota =angular.copy($scope.nota);
      console.log($scope.editableProject);
      $("#editModal").modal('hide');
      $scope.nota="";

    }
    else{
        notainput.addClass( "error" );
        mensaje.css("display","block");
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