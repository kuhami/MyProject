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
sort($cars);
print_r($cars);

echo '<hr>';
foreach ($cars as $value)
{
    echo $value.'<br>';
}
echo '<hr>';
 for ( $i=0; $i<count($cars);$i++){
     echo '<br>'.''.$cars[$i];
}
 echo $cars[0];

 echo '<hr>';
 $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

echo json_encode($arr);


$numArray =array(3,2,6,5,8,10);
$numCount = count($numArray);
for($i=$numCount-1;$i>=0;$i--){
    for($j=0;$j<$i;$j++){
        if($numArray[$j]< $numArray[$j+1]){
            $aa = $numArray[$j+1];
            $numArray[$j+1]=$numArray[$j];
            $numArray[$j]=$aa;
        }
    }
}
echo '<hr>';
print_r($numArray);
echo json_encode($numArray);

?>