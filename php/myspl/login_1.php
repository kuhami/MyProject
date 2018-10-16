<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/10
 * Time: 下午2:44
 */


$p = isset($_POST["p"]) ? $_POST["p"] : $_GET["p"];
$id = isset($_POST["id"]) ? $_POST["id"] : $_GET["id"];

$raw_success = array('code' => 1, 'msg' => '登录成功');
$raw_fail = array('code' => 0, 'msg' => '登录失败','data'=>['status' => 200, 'message' => '请输入密码']);

$res_success = json_encode($raw_success);

$res_fail = json_encode($raw_fail);

header('Content-Type:application/json');//这个类型声明非常关键

//if ($code == $_SESSION["verfycode"]) {
//    echo $res_success;
//} else {
//    echo $res_fail;
//}


if($id == "admin" && $p == "admin"){
    echo $res_success;
}else{
    echo $res_fail;
}
?>