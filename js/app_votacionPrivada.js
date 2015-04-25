(function () { // define funcionalidad
  var app = angular.module('votacionesPrivadas', ["ui.router"]);


  app.directive('votacionesPrivadas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/votacionPrivada/proyectosVotacionPrivada.html',
      controller: ['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
        $scope.proyectosElegidos = [];
        $scope.votar = false;
       $scope.voto = 0;
        $scope.votacionActiva= "";
        $scope.usuarios = [];

        $http.get('php/votacionActiva.php')
          .success(function (data) {
            $scope.votacionActiva = data;
            $http.post("php/proyectosEnVotacion.php", { "data" : $scope.votacionActiva[0].IdVotacion})
              .success(function(data) {
                $scope.proyectosElegidos = data;
                console.log( $scope.proyectosElegidos);
                for (var i = $scope.proyectosElegidos.length - 1; i >= 0; i--) {
                  $scope.proyectosElegidos[i].IdEquipo;
                    $scope.puntero = $scope.proyectosElegidos[i];
                     $http.post('php/estudiantesPorEquipo.php', { "data" : $scope.proyectosElegidos[i].IdEquipo})
                     .success(function (data){
                     $scope.puntero.Integrantes = data;
                     })
                  //llamada al pa de estudiante por equipo yo ya lo tengo hecho
                };
            })
          })

          $http.get('php/invitadosListar.php')
          .success(function (data) {
               $scope.usuarios = data;
          })
          .error(function(data,status){
            result = data || "jiji"
          });

        $scope.seleccionar = function(proyecto){
          $scope.video =proyecto.video;
          $("#video").attr("src", $scope.video); /* dinamic iframe */
          $scope.video = "";
        };

        $scope.enviarVotacion = function(proyecto){
           $http.post('php/votoverificar.php', { "data" : $rootScope.currentUser.id})
                     .success(function (data){
                    $scope.voto = data.Voto;
                    console.log($scope.voto);

                       if($scope.voto != 1){
                 $http.post('php/enviarvoto.php', { "data" : proyecto})
                 .success(function (data){
                        $http.post('php/updateVoto.php', { "data" : $rootScope.currentUser.id})
                       .success(function (data){
                             
                         });
                 }); 
              }else{
                
              }

            });
                   
        };

        $scope.addRate = function(protecto){
          protecto.rate+=1;
          if(protecto.rate>10){
            protecto.rate=0;
          }
        };

        $scope.currentRate1 = function(proyecto){
          if(proyecto.rate==0){
            return "img/starVacia.png"
          }else if(proyecto.rate==1){
            return "img/starMedia.png"
          }else if(proyecto.rate>=2){
            return "img/starLlena.png"
          }          
        };

        $scope.currentRate2 = function(proyecto){
          if(proyecto.rate==0){
            return "img/starVacia.png"
          }else if(proyecto.rate==3){
            return "img/starMedia.png"
          }else if(proyecto.rate>=4){
            return "img/starLlena.png"
          }  
        };

        $scope.currentRate3 = function(proyecto){
          if(proyecto.rate==0){
            return "img/starVacia.png"
          }else if(proyecto.rate==5){
            return "img/starMedia.png"
          }else if(proyecto.rate>=6){
            return "img/starLlena.png"
          }  
        };

        $scope.currentRate4 = function(proyecto){
          if(proyecto.rate==0){
            return "img/starVacia.png"
          }else if(proyecto.rate==7){
            return "img/starMedia.png"
          }else if(proyecto.rate>=8){
            return "img/starLlena.png"
          }  
        };

        $scope.currentRate5 = function(proyecto){
          if(proyecto.rate==0){
            return "img/starVacia.png"
          }else if(proyecto.rate==9){
            return "img/starMedia.png"
          }else if(proyecto.rate>=10){
            return "img/starLlena.png"
          }  
        };
      }]
    }
  });

  app.directive('estadoVotacion', function(){
    return{
      restrict: 'E',
      templateUrl: 'templates/partials/votacionPrivada/estadoVotacion.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.proyectosElegidos = [];
        $http.get('json/proyectosVotacion.json').success(function (data) {
          $scope.proyectosElegidos = data;
        }); 

      }]
    };
  });


})();