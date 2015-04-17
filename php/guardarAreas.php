<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

	foreach ($data->Areas as &$areas) {
		$qry = "CALL areascursoCrear('$areas->id','$data->id')";//
		$result2 =mysqli_query($conexion,$qry);
	}

mysqli_close($conexion);

?>


