<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL cursoCrear('$data->Nombre','$data->Codigo')";

$result = mysqli_query($conexion,$query);
// if($result){
// 	mysqli_free_result($result);
// }


		// $qry = "CALL areascursoCrear('2','5')";// area derecha
		// $result2 =mysqli_query($conexion,$qry);
		// if($result2){
		// 	echo true;
		// }
	
if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	//mysqli_free_result($result);
	// //foreach ($data->Areas as &$areas) {
	// 	//$idArea = $areas->id;
	// 	$qry = "CALL areascursoCrear('1','2')";//
	// 	$result2 =mysqli_query($conexion,$qry);
	// 	if($result2){
	// 		echo true;
	// 	}
	// //}
	mysqli_free_result($result);
	echo json_encode($Insert_Id);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>


