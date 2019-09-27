var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容', function(err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log(err, fd)
  console.log("文件打开成功！");
});
