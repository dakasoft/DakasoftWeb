<?php

	include "conexion.php";
	$data = file_get_contents("php://input");

	$objData = json_decode($data);
	$IdEstudiante = $objData->IdEstudiante;

	$query = "CALL portafolioEliminar('$IdEstudiante')";
	$result = mysqli_query($conexion,$query);

	if($result){
		echo true;
	}else{
		echo false;
	}

	mysqli_close($conexion);

?>