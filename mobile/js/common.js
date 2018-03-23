var common = {
    clearTime:function(){
        clearTimeout(window.toTimeoutPageId);
        clearTimeout(window.flowIntervalId);
    },

    sessionTimeoutStart : function(flowid,notFirstTime,source){
        window.toTimeoutPageId = setTimeout(function(){//鍚姩浼氳瘽瓒呮椂璁℃椂锛屽苟淇濆瓨璇ヨ鏃禝D,30鍒嗛挓 30*60*1000=1800000
            var wt = common.getMediaSouce();
            if(wt != null){
                window.location.href = '../microWebsite/error.html';
            } else {
                window.location.href = '../microWebsite/error.html';
            }
        },180000);
        if(!notFirstTime){
            //鍚姩淇濇寔娴佺▼璁℃椂鍣�
            common.keepFlow(flowid,source)
            //鐢ㄦ埛鐐瑰嚮浜嗛〉闈紝娓呴櫎涓や釜涔嬪墠鐨勮鏃跺櫒锛岄噸鏂拌鏃�
            $("body").bind("click",function(){
                clearTimeout(toTimeoutPageId);
                //clearTimeout(tipToUserTimeout);
                common.sessionTimeoutStart(flowid,true);
            });
        }

    },
    /**
     *	淇濇寔娴佺▼锛屾瘡30绉掑彂涓€娆�
     */
    keepFlow : function(flowid){
        if(flowid!=''&&flowid!=null){
            window.flowIntervalId = setInterval(function(){
                $.ajax({
                    url : "/do/keep-flow-ctx.do?flowId="+flowid,
                    dataType:"json",
                    success:function(data){
                        if(data.resultCode!='0'){
                            clearInterval(flowIntervalId);
                        }
                    },
                    error:function(){
                        window.location.href = '/microWebsite/error.html';
                    }
                });
            },30000);
        }
    },
    getMediaSouceUrl : function(){
        var theUrl = window.location.href;
        var paramIndex = theUrl.indexOf("WT.mc_id=");
        var mediaSource;
        if(paramIndex != -1) {
            mediaSource = theUrl.substring(paramIndex);
            var pIndex = mediaSource.indexOf("&");
            if(pIndex != -1) {
                mediaSource = mediaSource.substring(0,pIndex);
            }
            mediaSource = mediaSource.substring(9);
            mediaSource = common.unhtml(mediaSource,null);
        }else {
            mediaSource = "";
        }


        // 鑻ookie涓负绌猴紝鍒欓粯璁や负 'CXX-ZHITONGSEO-'
        if(!mediaSource || mediaSource =='direct' || mediaSource=='null') {
            mediaSource = 'CXX-ZHITONGSEO-';
        }

        return mediaSource;
    },
    getMediaSouce : function() {
        // 鍏堜粠mc_id涓彇
        var theUrl = window.location.href;
        var paramIndex = theUrl.indexOf("WT.mc_id=");
        var mediaSource;
        if(paramIndex != -1) {
            mediaSource = theUrl.substring(paramIndex);
            var pIndex = mediaSource.indexOf("&");
            if(pIndex != -1) {
                mediaSource = mediaSource.substring(0,pIndex);
            }
            mediaSource = mediaSource.substring(9);
            mediaSource = common.unhtml(mediaSource,null);
        }else {
            mediaSource = "";
        }


        // 鑻ookie涓负绌猴紝鍒欓粯璁や负 'CXX-ZHITONGSEO-'
        if(!mediaSource || mediaSource =='direct' || mediaSource=='null') {
            mediaSource = 'CXX-ZHITONGSEO-';
        }
        $('#mediaSource').val(mediaSource);
    },

    getInnerMedia : function() {
        var innerMedia = this.getCookie('inner_media');
        innerMedia = decodeURI(innerMedia);

        // 鑻ookie涓负绌猴紝鍒欓粯璁や负 'pingan'
        if(!innerMedia) {
            innerMedia = 'pingan';
        }

        $('#innerMedia').val(innerMedia);
    },
    getLpPage : function() {
        var localurl = window.document.referrer;
        if(localurl.indexOf("?") > 0) {
            localurl = localurl.substring(0, localurl.indexOf("?"));
        }
        if(localurl.length > 150) {
            localurl = localurl.substring(0, 150);
        }
        $('#lpPage').val(localurl);
    },

    getCookie : function(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split(";");

        for ( var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if ($.trim(arr[0]) == name)
                return $.trim(arr[1]);
        }
        return "";
    },
    getWeChatId: function(){
        // 鍏堜粠mc_id涓彇
        var url = window.location.href;
        var paramIndex = url.indexOf("weChatId=");
        var weChatId;
        if(paramIndex != -1) {
            weChatId = url.substring(paramIndex);
            var pIndex = weChatId.indexOf("&");
            if(pIndex != -1) {
                weChatId = weChatId.substring(0,pIndex);
            }
            weChatId = weChatId.substring(9);
        }else {
            weChatId = "";
        }
        return weChatId;
    },
    phoneVerif:function(phone, b){
        var phoneVal = phone.val(), sendCode = $("#sendCode");
        var repeat = 1;
        var seque = 1;
        for ( var i = 1; i < phoneVal.length; i++) {
            if (phoneVal.charAt(i) == phoneVal.charAt(i - 1)) {
                repeat++;
                if (repeat >= 5) {
                    break;
                }
            } else {
                repeat = 1;
            }
            if (phoneVal.charAt(i)- phoneVal.charAt(i - 1) == '1') {
                seque++;
                if (seque >= 6) {
                    break;
                }
            } else {
                seque = 1;
            }
        }
        if(!phoneVal){
            common.showError(phone, "璇疯緭鍏ユ偍鐨勬墜鏈哄彿鐮�", b);
            return false;
        }else if(phoneVal && !/^(13|14|15|16|17|18|19)[0-9]{1}[0-9]{4}[0-9]{4}$/.test(phoneVal)){
            common.showError(phone, "鎵嬫満鍙风爜鏍煎紡鏈夎锛�", b);
            return false;
        }else if(phoneVal && (repeat>='5'||seque>='6')){
            common.showError(phone, "鎵嬫満鍙风爜涓嶅悎瑙勮寖锛�", b);
            return false;
        }else{
            sendCode.addClass("active");
            $(".error").css("display","none");
            return true;
        }
    },
    nameVerif : function(name, b){
        var nameVal = name.val();
        if(!nameVal){
            common.showError(name, "璇疯緭鍏ユ偍鐨勫鍚�", b);
            return false;
        }else if(nameVal && !/^([\u4e00-\u9fa5\s]{2}|[a-zA-Z]{4})([\u4e00-\u9fa5\s]{0,18}|[. ]{0,36}|[鈥� ]{0,36}|[a-zA-Z]{0,36})*$/.test(nameVal)){
            common.showError(name, "濮撳悕涓嶇鍚堣鑼冿紒", b);
            return false;
        }else if (nameVal == '涓嶈' || nameVal == '涓嶇ゥ'|| nameVal == '鏈煡'|| nameVal == '涓嶇煡閬�'|| nameVal == '濮撳悕'|| nameVal.indexOf('娴嬭瘯') > -1|| nameVal.indexOf('test') > -1){
            common.showError(name, "濮撳悕涓嶇鍚堣鑼冿紒", b);
            return false;
        }else{
            $(".error").css("display","none");
            return true;
        }
    },

    showError:function(target, str, b){
        alert(str);
    },
    unhtml :function(str, reg) {
        if(str){
            return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function (a, b) {
                if (b) {return a;}
                else {
                    return {
                        '<':'&lt;',
                        '&':'&amp;',
                        '"':'&quot;',
                        '>':'&gt;',
                        "'":'&#39;'
                    }[a]
                }
            }) : '';
        }
    }

}
//鐧惧害鍙互缁熻鎸夐敭閲�
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5cc92e7a9a37a0546a5bf7d217afb282";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
//wap鐗坵ebtrends浠ｇ爜
function loadWTScript(a, b) {
    var c = document.createElement("script");
    c.type = "text/javascript",
        c.async = !0, c.id='wtjs',
        c.src = a,
        dcsReady(c, b),
        document.getElementsByTagName("head")[0].appendChild(c)
}
function dcsReady(a, b) {
    a.readyState ? a.onreadystatechange = function() { ("loaded" == a.readyState || "complete" == a.readyState) && (a.onreadystatechange = null, b())
    }: a.onload = function() {
        b()
    }
}
if(document.getElementById("wtjs")==null)
    loadWTScript(window.location.protocol.indexOf('https:')==0?'https://pa-ssl.pingan.com/app_js/sdc/prd/sdc9_m.js':'http://www.pingan.com/app_js/sdc/prd/sdc9_m.js', function(){
        if (typeof(_tag) != "undefined"){
            _tag.dcsid="dcs82b9ujitigdu3gaykxw0hn_5p6b";  //dcsid鍙傛暟鐢ㄤ簬璁剧疆鏃ュ織璁板綍鍦ㄥ摢涓枃浠堕噷
            _tag.DCSext.platform="xxxx";  //骞冲彴鍚嶅瓧
            var s=_tag.dcsGetIdAsync();
            if(s)
                dcsReady(s,function(){_tag.dcsCollect()});
            else
                _tag.dcsCollect();
        }
    })