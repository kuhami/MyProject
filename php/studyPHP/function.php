<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/8
 * Time: 下午5:47
 */
function writeName($fname){
    echo $fname." Kai Jim Refsnes";
}

echo "My name is ";
writeName('<i style="color: red;">li</i>');

echo "<hr>";

echo '这是第 " '  . __LINE__ . ' " 行';
echo "<hr>";
echo '该文件位于 " '  . __FILE__ . ' " ';


?>