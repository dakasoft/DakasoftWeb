
(function () { // define funcionalidad

var app = angular.module('factory', []);
//auto crear alerta
app.factory('funciones',function(){
    return{
        alert:function(containerId, alertType, message,hide){
        	     $("#" + containerId).append('<div class="alert alert-' + alertType + '" id="alert' + containerId + '">' + message + '</div>');
               return  $("#alert" + containerId).alert();
                
        },
        closeC:function(){
         	return $(".alert").remove();
        }


    }

});


})();