(function () { // define funcionalidad
  var app = angular.module('votacionesPrivadas', ["ui.router"]);


  app.directive('votacionesPrivadas',function ($http) {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/proyectosVotacionPrivada.html',
      controller: ['$scope','$http',function ($scope,$http) {
        $scope.proyectosElegidos = [];
        $scope.votar = false;

        $http.get('json/proyectosVotacion.json').success(function (data) {
          $scope.proyectosElegidos = data;
        }); 

        $scope.seleccionar = function(proyecto){
          $scope.video =proyecto.video;
          $("#video").attr("src", $scope.video); /* dinamic iframe */
          $scope.video = "";
        };

        $scope.enviarVotacion = function(proyecto){
          if($scope.votar){
            alert("Ya ud voto");
            angular.forEach($scope.proyectosElegidos, function(value, key) {
              value.rate = 0
            });
          }else{
            $scope.votar = true;
            angular.forEach($scope.proyectosElegidos, function(value, key) {
              value.rate = 0
            });
          }
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
      templateUrl: 'templates/partials/estadoVotacion.html',
      controller: ['$scope','$http','ngTableParams',function ($scope,$http,ngTableParams) {
        $scope.proyectosElegidos = [];
        $http.get('json/proyectosVotacion.json').success(function (data) {
          $scope.proyectosElegidos = data;
        }); 

      }]
    };
  });


})();