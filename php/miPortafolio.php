<?php

include "conexion.php";
 $data = file_get_contents("php://input");

 $objData = json_decode($data);
 $data = $objData->data;

//var_dump($data);
 $query = "CALL miPortafolio('7')";
$result = mysqli_query($conexion,$query);
$rows = array();

//$pers = $result->fetch_array(MYSQLI_ASSOC);
while($r = mysqli_fetch_assoc($result)){
	$rows[] = $r;
}

echo json_encode($rows);
mysqli_free_result($result);
mysqli_close($conexion);



?>