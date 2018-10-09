<?php
/**
 * Created by PhpStorm.
 * User: mwbyd
 * Date: 2018/10/8
 * Time: 下午6:01
 */


class Site {
    /* 成员变量 */
    var $url;
    var $title;

    /* 成员函数 */
    function setUrl($par){
        $this->url = $par;
    }

    function getUrl(){
        echo $this->url . PHP_EOL;
    }

    function setTitle($par){
        $this->title = $par;
    }

    function getTitle(){
        echo $this->title . PHP_EOL;
    }
}

$runoob = new Site;
$taobao = new Site;
$google = new Site;

// 调用成员函数，设置标题和URL
$runoob->setTitle( "菜鸟教程" );
$taobao->setTitle( "淘宝" );
$google->setTitle( "Google 搜索" );

$runoob->setUrl( 'www.runoob.com' );
$taobao->setUrl( 'www.taobao.com' );
$google->setUrl( 'www.google.com' );

// 调用成员函数，获取标题和URL
$runoob->getTitle();
echo '<br>';
$taobao->getTitle();
echo '<br>';
$google->getTitle();
echo '<hr>';
$runoob->getUrl();
echo '<br>';
$taobao->getUrl();
echo '<br>';
$google->getUrl();
?>

<form action="form/welcome.php" method="post">
    名字: <input type="text" name="fname">
    年龄: <input type="text" name="age">
    <input type="submit" value="提交">
</form>
