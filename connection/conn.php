<?php

$host = "localhost";
$usuario = "";
$senha = "";
$banco = "";

$conexao = new mysqli($host, $usuario, $senha, $banco);

if(!$conexao):
  echo "Erro ao conectar ao banco";
  
endif;