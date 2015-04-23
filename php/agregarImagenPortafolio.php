<?php

   include "conexion.php";
   $data = file_get_contents("php://input");

   $objData = json_decode($data);
   $data = $objData->data;

   $path= "files/".$data->url;
   	var_dump($data->id);
      $query = "CALL agregarImagenPortafolio('$data->id','$path')";
      $result = mysqli_query($conexion,$query);
   
?>