<?php

   $file = $_FILES["file"]["name"];

   if(!is_dir("files2/"))
   	mkdir("files2/",0777);
   $existe=false;
    $i=0;
   while(!$existe){
     $file = $i.$file;
   	if($file && move_uploaded_file( $_FILES["file"]["tmp_name"],"files/".$file)){
      $existe =true;
   		echo $file;
   	// $path= "sdsddkdjdjdksksk";
   	// var_dump($path);
      // $query = "CALL agregarImagenPortafolio('$path')";
      // $result = mysqli_query($conexion,$query);
    }else{
   	 $existe = false;
   	 $i++;

     }
   }

   
?>