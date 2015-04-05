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
          $http.get('json/portafolio.json').success(function (data) {
            $scope.estudiantes = data;
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