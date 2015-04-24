<?php

	include "conexion.php";
	$data = file_get_contents("php://input");

	$objData = json_decode($data);
	$data = $objData->data;

	$query = "CALL loginSolicitarRol('$data')";
	$result = mysqli_query($conexion,$query);

	if($result){
		$Rol = $result->fetch_array(MYSQLI_ASSOC);
		mysqli_free_result($result);
		echo json_encode($Rol);
	}else{
		echo false;
	}

	mysqli_close($conexion);

?>