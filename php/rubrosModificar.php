
<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

//  begin
//   update tbrubro
//     set Nombre = Nombre,
//         Valor=Valor
//     where IdRubro = Id;
// end
// rubrosModificar

$query = "CALL rubrosModificar('$data->nombre','$data->valor')";
$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>