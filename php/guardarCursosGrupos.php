<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
	foreach ($data->Cursos as &$curso) {
		$idCurso = $curso->id;
		$qry = "CALL cursoporcarreraCrear('$idCurso','$data->id')";//
		$result2 =mysqli_query($conexion,$qry);
	}

mysqli_close($conexion);

?>


