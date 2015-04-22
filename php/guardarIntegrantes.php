<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

	foreach ($data->Integrantes as &$estudiante) {
		$idEstudiante = $estudiante->id;
   	$idrol = $estudiante->Role->id;
    $qry = "CALL estudianteEquipoAgregar('$idEstudiante','$data->id','$idrol')";
		$result2 =mysqli_query($conexion,$qry);
	}

mysqli_close($conexion);

?>


