<?php
/**
 * Created by PhpStorm.
 * User: mwbyd
 * Date: 2018/10/8
 * Time: 下午6:01
 */


class classname
{
    function __construct()
    {
        echo __METHOD__,"\n";
    }
}
function funcname()
{
    echo __FUNCTION__,"\n";
}
const constname = "global";

$a = 'classname';
$obj = new $a; // prints classname::__construct
$b = 'funcname';
$b(); // prints funcname
echo constant('constname'), "\n"; // prints global



?>