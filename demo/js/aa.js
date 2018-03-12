var OptionFile=(function (opt) {
 
      var o={
 
        width:100,  //
 
        height:100,
 
        gapWidth:2
 
      };
 
      var o = $.extend(o,opt),
 
        _body=$('body'),
 
        boxBg='<div style="position: absolute;height: 100%;width: 100%;background: rgba(225,225,225,1);left: 0;top: 0;z-index: 1"></div>',
 
        movingBox='<div class="moving-box" style="width: '+o.width+'px;height: '+o.height+'px;box-sizing:border-box;position: absolute;z-index: 8888;"></div>';
 
      return {
 
        actionLock:false, //移动锁定
 
        releaseTarget:false, //释放锁定
 
        keyCode:null,  //当前按键 键值
 
        //鼠标按下操作
 
        optionDown:function ( selectFile , type , evt ) {
 
          this.releaseTarget=false;
 
          this.getImgList(selectFile);
 
          var currentX=evt.pageX;
 
          var currentY=evt.pageY;
 
          $('.moving-box').css({
 
            top:currentY+10,
 
            left:currentX+10
 
          })
 
        },
 
        //鼠标移动操作
 
        optionMoving:function (selectFile , type , evt ) {
 
          if(this.actionLock){
 
            this.optionDown(selectFile , type , evt );
 
          }
 
        },
 
        getImgList:function (selectFile) {
 
          var length = selectFile .length,
 
            imgWidth = o.width-10-(length)*o.gapWidth,
 
            imgHeight = o.height-10-(length)*o.gapWidth;
 
          if(!this.actionLock){
 
            _body.append(movingBox);
 
            $('.moving-box').append(boxBg);
 
            $.each(selectFile,function (k, v) {
 
              var img = '<img style="width:'+imgWidth+'px;height:'+imgHeight+'px;z-index:'+(k+2)+';position:absolute;right:'+(k+1)*o.gapWidth+'px;top:'+(k+1)*o.gapWidth+'px" src="'+v.src+'"/>';
 
              $('.moving-box').append(img);
 
            });
 
          }
 
          this.actionLock=true;
 
        },
 
        //放开鼠标操作(回调函数，返回按键键值和当前目标)
 
        closeOption:function (funcones) {
 			
          var _this= this;
 
          $(document).keydown(function (event) {
 
            _this.keyCode=event.keyCode;
 
            $(document).mouseup(function (e) {
 
              if(!_this.releaseTarget){
 
                $('.moving-box').remove();
 
                _this.actionLock=false;
 
                $(document).unbind('mousemove');
 
                _this.releaseTarget=true;
 
                funcones(e,_this.keyCode);         //返回当前 释放的 目标元素 ， 和按键code
 
                $(document).unbind('keydown');
 
                _this.keyCode=null;
 
              }
 
            })
 
          });
 
          $(document).trigger("keydown");
 
          $(document).keyup(function (event){
 
            $(document).unbind('keyup');
 
            $(document).unbind('keydown');
 
            _this.keyCode=null;
 
          })
 
        }
 
      }
 
    })


$(function () {
 
  $(function () {
 
    $('.test').areaSelect()  //框选操作
 
  })
 
   var optionImg= new OptionFile();
 
   $('.test li').mousedown(function(e){
 	
 	
     if($(this).hasClass('selected')) {
 
       e.preventDefault();
 
       e.stopPropagation();
 
     }
 
     var firstImg = $(this).find('img'),
 
       currentList=$('.test li.selected img'); //框选的图片list，用于移动的时候显示
 		
     currentList.push({src:firstImg.attr('src')}); //移动时候的第一张图片
 
     var loop = setTimeout(function () {
 
       optionImg.optionDown(currentList,1,e );
 
       $(document).mousemove(function (e) {
 
         optionImg.optionMoving(currentList,1,e);
 
         optionImg.closeOption(function (e,keycode) {

           var target=$(e.target);  //目标位置 可以判断目标不同位置执行不同操作

//         console.log(keycode);   //拖拽放开时候是否有按键 keycode 按键的值  可以通过不同的 keycode 来执行不同操作
 			
 			
 			var len = $('.test li.selected').length;
 			var arr =[];
 			for(var i=0; i < len; i++){
 				arr.push($('.test li.selected').eq(i).attr('status'))
 			}
 			console.log(arr)
 			
 			console.log(target.attr('status'))
 			if(target.attr('status') == '111'){
 				
 					$('.test li.selected').remove()
 					
 			}
 			
           
 
         });
 
       });
 
     },200);
 
     $(document).mouseup(function () {
 
       clearTimeout(loop);
 		
     });
 
   });
 
})