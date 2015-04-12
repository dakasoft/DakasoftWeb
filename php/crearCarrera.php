<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
var_dump($data);

/*necesitamos 2 querys*/
/*este query va a ser recorrido ya que tenemos q guadar todos los cursos de este pendejo*/

foreach ($data->Cursos as &$curso) {
    $curso//pusheamos a este mae en db, me estoy pegando un descansito
}

/*el segundo result nos devuelve el id de la carrera que acabamos de ingresar*/
$query = "CALL carreraCrear('$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);

if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	echo json_encode($Insert_Id);
	mysqli_free_result($result);
}else{
	echo false;
}

mysqli_close($conexion);

?>