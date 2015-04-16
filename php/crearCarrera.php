<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$query = "CALL carreraCrear('$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);

if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	var_dump($data->Cursos); //
	print_r($data);  
	foreach ($data->Cursos as &$curso) {
		$idCurso = $curso->id;
		$qry = "CALL cursoporcarreraCrear('$idCurso','$Insert_Id')";
	}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>