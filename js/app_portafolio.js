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
          $scope.portafolio= [];
          $scope.editableUser = estudiante;
          $scope.portafolio.id= estudiante.id
          $scope.portafolio.foto = estudiante.foto;
          $scope.portafolio.correo = estudiante.correo;
          $scope.portafolio.telefono = estudiante.telefono;
          $scope.portafolio.OtraInfo = estudiante.OtraInfo;
        };
         $scope.guardar = function(){
          if($scope.editableUser != ""){
                 $http.post("php/modificarPortafolio.php", { "data" : $scope.portafolio})
                  .success(function(data) {            
                  $scope.editableUser.correo =$scope.correo;
                 $scope.editableUser.telefono =$scope.telefono;
                 $scope.editableUser.OtraInfo = $scope.OtraInfo;        
                      $scope.cursos = funciones.editarDeLista($scope.cursos,curso);
                      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                      setTimeout(function(){$("#editModal").modal('hide')},1000);  
                   })
                  .error(function(data, status) {
                      result = data || "Request failed";//hacer algo con esto.
                   }); 


            
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