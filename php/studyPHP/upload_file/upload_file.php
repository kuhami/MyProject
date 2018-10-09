<?php
/**
 * Created by PhpStorm.
 * User: lyl
 * Date: 2018/10/9
 * Time: 下午4:46
 */


echo json_encode($_FILES);//对变量进行 JSON 编码

echo '<hr>';

if ($_FILES["file"]["error"] > 0)
{
    echo "错误：" . $_FILES["file"]["error"] . "<br>";
}
else
{
    echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
    echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
    echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"];
}
?>
<script>
    let file = <?php echo  json_encode($_FILES);?>

    console.log(file);
</script>
