(function(){
var app = angular.module('portafolio', ["ui.router"]);

app.directive('portafolio', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/partials/portafolio/portafolio.html',
        
       controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
          $scope.estudiantes = [];
          $scope.video= "";
          $scope.editableUser = "";

          //if the person is a student we need change this pa.
        $http.get('php/listarPortafolio.php')
          .success(function (data) {
            $scope.estudiantes = data;
            for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
              $scope.estudiantes[i].id;
              $scope.estudiantes[i].proyectos = [];
              $scope.puntero = $scope.estudiantes[i];
              $http.post('php/listarProyectosEstudiante.php', { "data" : $scope.estudiantes[i].id })
              .success(function (data){
                $scope.puntero.proyectos = data;
              })
              .error(function(data,status){
                result = data || "jiji"
              }); 
            };
            console.log($scope.estudiantes);
          })
          .error(function(data,status){
            result = data || "jiji"
          });

        $scope.seleccionar = function(proyecto){
          $scope.video =proyecto.video;
          $("#video").attr("src", $scope.video); /* dinamic iframe */
          $scope.video = "";
        };

        $('#editModalV').on('hidden.bs.modal', function (e) {
          $("#video").attr("src", $scope.video);
          $scope.video = "";
        })


         $scope.editar = function(estudiante){
          $scope.editableUser = estudiante;
          $scope.foto = estudiante.foto;
          $scope.correo = estudiante.correo;
          $scope.telefono = estudiante.telefono;
          $scope.OtraInfo = estudiante.OtraInfo;
        };
         $scope.guardar = function(){
          if($scope.editableUser != ""){
            $scope.editableUser.correo =$scope.correo;
             $scope.editableUser.telefono =$scope.telefono;
              $scope.editableUser.OtraInfo = $scope.OtraInfo;
          }
        $("#editModal").modal('hide');
        };

      }]
    };
  });

  app.directive('modalPortafolio',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/portafolio/modalPortafolio.html'
    };
});
  app.directive('modalVideo',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/shared/modalVideo.html'
    };
  });


})();