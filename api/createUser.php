<?php
require_once("../connection/conn.php");

$nome = $_POST['nome'];

$result = 'INSERT INTO usuarios (nome, score) VALUES ("'.$nome.'", 0)';
$resultado = mysqli_query($conn, $result);

if($resultado){
  header("Location: ../index.html");
}else{
  header("Location: ../index.html");
}

mysqli_close($conexao);