
(function () { // define funcionalidad

var app = angular.module('factory', []);
//auto crear alerta
app.factory('funciones',function(){
    return{
        alert:function(containerId, alertType, message,hide){
        			$(".alert").remove();
        	    $("#" + containerId).append('<div class="alert alert-' + alertType + '" id="alert' + containerId + '">' + message + '</div>');
              return  $("#alert" + containerId).alert();
                
        },
        closeC:function(){
         	return $(".alert").remove();
        },
        usuario:function(){
        	return {id:"",nombre:"",apellido:"",email:"",password:"",rol:""};
        },
        carrera:function(){
          return {id:"",nombre:"",cod:"",cursos:[]};
        },
        curso:function(){
          return {id:"",nombre:"",cod:"",area:[]};
        },
        grupo:function(){
          return {id:"",nombre:"",curso:"",cursoId:"",encargado:"",encargadoId:"",profesores:[],estudiantes:[]};
        },
        votacion:function(){
          return {id:"",fecha:"",fechaProyectos:"",fechaCierre:"",activo:false};
        },
        rubro:function(){
          return {id:"",nombre:"",valor:""};
        },  
        agregarALista:function(lista,objeto){
      	  lista.push(objeto);
      	  return lista;
        },
        agregarAListaNoRepetido:function(lista,objeto){
          var repetido = false;
          angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              repetido = true;
            }
          });

          if(!repetido) lista.push(objeto);

          return lista;
        },
        agregarAListaNoRepetidoPorNombre:function(lista,objeto){
          var repetido = false;
          angular.forEach(lista, function(value, key) {
            if(value.nombre.toLowerCase() == objeto.nombre.toLowerCase()){
              repetido = true;
            }
          });

          if(!repetido) lista.push(objeto);

          return lista;
        },
        editarDeLista:function(lista,objeto){
        	angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              lista[key] = objeto;
            }
          });
          return lista;
        },
        nuevoId:function(lista){
          if(lista.length){
            var last = lista[lista.length - 1];
            return last.id+1;
          }else{
            return 1;
          }

        },
        borrarDeLista:function(lista,objeto){
        	angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              lista.splice(key, 1);
            }
          });
          return lista;
        },
        borrarDeListaPorNombre:function(lista,objeto){
          angular.forEach(lista, function(value, key) {
            if(value.nombre.toLowerCase()== objeto.nombre.toLowerCase()){
              lista.splice(key, 1);
            }
          });
          return lista;
        }
    }

});


})();