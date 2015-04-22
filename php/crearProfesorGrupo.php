<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);

$IdGrupo = $objData->IdGrupo;
$IdProfesor = $objData->IdProfesor;
$IdArea = $objData->IdArea;

$query = "CALL profesorPorGrupoCrear('$IdGrupo', '$IdProfesor', '$IdArea')";

$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>