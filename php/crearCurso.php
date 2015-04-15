<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$query = "CALL cursoCrear('$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);
	var_dump($data);
if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	var_dump($data);
	foreach ($data->Areas as &$areas) {
		$idAreas = $areas->id;
		$qry = "CALL areasporcursoCrear('$idAreas','$Insert_Id')";
	}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>


