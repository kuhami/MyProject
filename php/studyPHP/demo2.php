<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/8
 * Time: 下午1:58
 */
 $t=date("H");
 echo $t;
 if ($t<"20") {
    echo "Have a good day!";
  }else if($t<"10"){
     echo "Have a good night!";
 }else{

 }
echo '<hr>';

 $cars=array("Volvo","BMW","Toyota");
 echo $cars[0];

 echo '<hr>';
 $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

echo json_encode($arr);



?>