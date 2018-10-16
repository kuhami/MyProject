<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/11
 * Time: 下午2:44
 */

$yesterday  = mktime(0, 0, 0, date("m") , date("d")-1 , date("Y"));

echo date("Y-M-d h:i:s", $yesterday);

echo  strrev('wqro');




?>