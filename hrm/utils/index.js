import isEmpty from 'lodash/isEmpty';

function translateFormFields(fields){
    let params = {};
    if(fields && !isEmpty(fields)){
        for (let key in fields) {
        	params[fields[key].name] = fields[key].value
        }
    }
    return params
}
function createQRCode(data){
	//生成二维码	
	var	txt = "BEGIN:VCARD \n"+
	"VERSION:3.0 \n"+
	"N:"+data.lastname+" \n"+
	"TEL;CELL;VOICE:"+data.mobile+"\n"+ 
	"TEL;WORK;VOICE:"+data.telephone+"\n"+
	"EMAIL:"+data.email+" \n"+
	"TITLE:"+data.jobtitle+" \n"+
	"ROLE:"+data.department+"\n"+
	"ADR;WORK:"+data.locationname+" \n"+
	"END:VCARD";
	jQuery('.hrm-my-card-basicInfo-sqr').qrcode({
		render: 'canvas',
		background:"#ffffff",
		foreground:"#000000",
		msize:0.3,
		size:120,
		mode:0,
		label:data.lastname,
		image:"/images/hrm/weixin_wev8.png",
		text: utf16to8(txt)
	});
	function utf16to8(str) {                                         
	  var out, i, len, c;                                          
	  out = "";                                                    
	  len = str.length;                                            
	  for(i = 0; i < len; i++) {                                   
	  c = str.charCodeAt(i);                                       
	  if ((c >= 0x0001) && (c <= 0x007F)) {                        
	      out += str.charAt(i);                                    
	  } else if (c > 0x07FF) {                                     
	      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
	      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));  
	      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
	  } else {                                                    
	      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));  
	      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
	  }                                                           
	  }                                                           
	  return out;                                                 
	}
} 
/**
图片放大
*/
function imgZoom(dom, parentSelector){
    let imgList = jQuery(parentSelector + " img",dom);
    imgList.each((index,img) => {
        let $img = $(img);
        if ($img.attr("resize")) {
            return;
        }
        if ($img.parents(".ui-coomixPic").length > 0) {
            return;
        }
        $img.css({"max-width": "800px", "max-height" : "800px"}).attr("resize", 1).coomixPic({
            path:'/blog/js/weaverImgZoom/images',
            preload:true,
            blur: true,
            left: '向左转',
            right: '向右转',
            source: '查看原图',
            hide: '收起'
        });
    });
};

export {
	translateFormFields,
	createQRCode,
	imgZoom,
}