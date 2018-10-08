<?php

/**
 * Created by PhpStorm.
 * User: mwbyd
 * Date: 2017/12/21
 * Time: 下午6:27
 */
    $closure = function ($name){

        return sprintf('Hellow %s',$name);

    };

    echo $closure("json");
    echo "<hr>";
    $numbersPlusOne = array_map(function ($number){
        return $number +1;
    },[1,2,3,4,5,67]);

    print_r($numbersPlusOne);

    echo "<hr>";
//使用use关键字附加闭包的状态
    function enclosePerson($name){
            return function ($doCommond) use ($name){
              return sprintf('%s,%s',$name,$doCommond);
            };
    }

    $clay = enclosePerson('Clay');

    echo $clay('get me sweet tea!');

    echo '<hr>';



