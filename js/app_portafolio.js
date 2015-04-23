(function(){
var app = angular.module('portafolio', ["ui.router"]);

app.directive('portafolio', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/partials/portafolio/portafolio.html',
        
       controller: ['$scope','$http','ngTableParams','funciones','$rootScope','upload',function ($scope,$http,ngTableParams,funciones,$rootScope,upload) {
          $scope.estudiantes = [];
          $scope.video= "";
          $scope.editableUser = "";
         if($rootScope.roleLv != 1){
           //if the person is a student we need change this pa.
        $http.get('php/listarPortafolio.php')
          .success(function (data) {
            $scope.estudiantes = data;
            // for (var i = $scope.estudiantes.length - 1; i >= 0; i--) {
            //   $scope.estudiantes[i].id;
            //   $scope.estudiantes[i].proyectos = [];
            //   $scope.puntero = $scope.estudiantes[i];
            //   $http.post('php/listarProyectosEstudiante.php', { "data" : $scope.estudiantes[i].id })
            //   .success(function (data){
            //     $scope.puntero.proyectos = data;
            //   })
            //   .error(function(data,status){
            //     result = data || "jiji"
            //   }); 
            // };
          
          })
          .error(function(data,status){
            result = data || "jiji"
          });


         }else{
            //  console.log($rootScope.currentUser.id);
           $http.post('php/miPortafolio.php', { "data" : $rootScope.currentUser.id })
          .success(function (data) {
            console.log(data);
            $scope.estudiantes=data; 
              console.log($scope.estudiantes[0]);      
              $scope.estudiantes.id;
              $scope.estudiantes[0].proyectos = [];
              $scope.puntero = $scope.estudiantes[0];
             $http.post('php/listarProyectosEstudiante.php', { "data" : $rootScope.currentUser.id })
             .success(function (data){
              $scope.puntero.proyectos = data;
              console.log($scope.estudiantes[0]);
             })
             .error(function(data,status){
              result = data || "jiji"
             });    
          })
          .error(function(data,status){
            result = data || "jiji"
          });



         };
         
         $scope.uploadFile = function(){
          var name = $scope.name;
          var file = $scope.file;
          upload.uploadFile(file,name).then(function(res){
            console.log(res.data);
            var imagen ={id:$scope.portafolio.IdPortafolio,url:res.data}
            $http.post("php/agregarImagenPortafolio.php", { "data" : imagen})
                  .success(function(data) {
                    console.log(data);
                     
                   })
          })

         }
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
          $scope.portafolio = estudiante;
          console.log($scope.portafolio);
        
        };
         $scope.guardar = function(){
       
          if($scope.portafolio != ""){
                 $http.post("php/modificarPortafolio.php", { "data" : $scope.portafolio})
                  .success(function(data) {
                    console.log(data);
                      $scope.estudiantes = funciones.editarDeLista($scope.estudiantes,$scope.portafolio);
                      funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
                      setTimeout(function(){$("#editModal").modal('hide')},1000);  
                   })
                  .error(function(data, status) {
                      result = data || "Request failed";
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
app.directive('uploaderModel',function ($http,$parse) {
   return{
  restrict : 'A',
  link: function (scope,iElement,iAttrs){
   iElement.on("change",function(e){
        $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
 });
  }
};

  });

app.service('upload',function($http,$q){
    this.uploadFile = function(file,name){
      var deferred =$q.defer();
      var formData = new FormData();
      formData.append("name",name);
      formData.append("file",file);
      return $http.post("server.php",formData,{
        headers:{
          "Content-type":undefined
        },
        transformRequest:formData
      })
      .success(function(res){
        deferred.resolve(res);
      })
      .error(function(msg,code){
        deferred.reject(msg);
      })
      return deferred.promise;
    }


})

})();