(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router"]);
/*Quitar el hashtag en el browser*/


/* manejador de rutas*/
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html"
    })

    .state('portafolio',{
    	 url: "/portafolio",
        templateUrl:"templates/portafolio.html",
         controller: function($scope) {
   
            }

    });

});

/*Directiva para el menu*/
app.directive('menu', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/parcials/menu.html',
		controller:function($scope,$location){
			$scope.mensaje ="soy el menu";
			//$scope.go = function ( path ) { $location.path( path ); };
		},
		controllerAs: 'menuCtrl'
	};
});


})();