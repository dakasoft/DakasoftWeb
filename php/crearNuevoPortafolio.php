<?php

	include "conexion.php";
	$data = file_get_contents("php://input");

	$objData = json_decode($data);
	$IdEstudiante = $objData->IdEstudiante;

	$query = "CALL nuevoPortafolioCrear('$IdEstudiante')";

	$result = mysqli_query($conexion,$query);

	mysqli_free_result($result);
	mysqli_close($conexion);

?>