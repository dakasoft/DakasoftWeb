<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);

$IdCurso = $objData->IdCurso;

$query = "CALL cursoEliminar('$IdCurso')";

$result = mysqli_query($conexion,$query);

var_dump($IdCurso);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>