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
    });

});

/*Directiva para el menu*/
app.directive('menu', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/parcials/menu.html',
		controller:function($scope){
			$scope.mensaje ="soy el menu";
		},
		controllerAs: 'menuCtrl'
	};
});

})();