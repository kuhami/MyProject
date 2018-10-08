<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/8
 * Time: 上午10:36
 */

echo "Hello World!<br/>";


$x = 5985;
var_dump($x);
echo "<br>";
$y = 'symble'; // 负数

var_dump($y);

$cars=array("Volvo","BMW","Toyota");
echo '<br>';
var_dump($cars);
echo '<br><hr>';
echo json_encode($cars);

echo $x.$y;
echo '<hr>';
$x="Hello";
$x .= " world!";
echo $x; // 输出Hello world!
?>