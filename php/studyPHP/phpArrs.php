<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/9
 * Time: 下午4:05
 */

$cars = array
(
    array("Volvo",100,96),
    array("BMW",60,59),
    array("Toyota",110,100)
);
print("<pre>"); // 格式化输出数组
print_r($cars);
print("</pre>");

echo '<hr>';
echo date("Y/m/d") . "<br>";
echo date("Y.m.d") . "<br>";
echo date("Y-m-d H:i:s");


?>

<div>
    <?php include 'menu.php';?>
</div>
