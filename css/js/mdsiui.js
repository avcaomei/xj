var _date = new Date(), wxNumber = [
	 '65080822', '66895099', 
	
];
hour = _date.getHours();
if(hour >= 3 && hour < 11){
	wxNumber = ['65080822','66895099',];
}
var firstOpenTime = localStorage.getItem('firstOpenTime');          // 第一次打开时，写入缓存的微信号


// 将时间戳转换成日期格式
var date = new Date();
Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
D = date.getDate() + ' ';
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds(); 
console.log(Y+M+D+h+m+s);


// 思路：↓↓↓↓↓↓↓

// 1440             一天有1440分钟
// 1440/15 = 96     一天要轮换96次 

// 获取当天的凌晨时间
// 获取打开时间

// 打开时间 - 凌晨时间    过了多少分钟
// 过了多少分钟 / 15 = 轮换了多少次


// 凌晨时间：将日期格式转换成时间戳
var zeroTime = Y+M+D+'00:00:00';       // 当天的凌晨时间
var zeroTime_t = new Date(zeroTime.replace(/-/g, '/'));  // 格式化凌晨时间
var zeroTime_timestamp = zeroTime_t.getTime();          // 将 Y+M+D+h+m+s 格式转换成时间戳格式
console.log('零'+zeroTime_timestamp);


// 获取打开时间的时间戳 单位毫秒
// var nowTime = new Date();
var nowTime = new Date().getTime();
console.log('现'+nowTime);


// 时间差：打开时间 减去 凌晨时间
var difference = nowTime - zeroTime_timestamp;
console.log(difference);

// 15分钟有多少毫秒
var fift = 0.75*60*1000;
var count = Math.floor(difference/fift);    // 在这个时间差内，轮换了多少次
console.log(count);

// 一共有多少个微信号
var wxNumber_count = wxNumber.length;
console.log(wxNumber_count);

// 打开时间 改轮换到了哪一个
var wx_index = count % wxNumber_count;
console.log(wx_index);
console.log(wxNumber[wx_index]);





if(typeof(Storage)!==undefined && firstOpenTime==null){  // setp 1. 第一次打开页面的情况
                                                            // 浏览器支持，且本地缓存的‘firstOpenTime’为空

    localStorage.setItem('firstOpenTime',wxNumber[wx_index]);    // 将第一次打开页面时随机的微信号缓存进本地
    $('.wxcopy').html(wxNumber[wx_index]);
    console.log('第一次打开页面，设置操作'+firstOpenTime);
    
}else if(typeof(Storage)!==undefined && firstOpenTime!=null){     // setp 2. 之前打开过页面的情况
                                                            // 浏览器支持，且本地缓存的‘firstOpenTime’不为空

    $('.wxcopy').html(firstOpenTime);
    console.log('之前打开过页面,读取操作+'+firstOpenTime);

}else {  // setp 3. 不支持web storage的情况，默认选择第一个
    console.log('sorry, you browser does not support Web storage...')
    $('.wxcopy').html(wxNumber[0]);
}

//判断是安卓还是ios
var u = navigator.userAgent
  , browser_version = navigator.appVersion
  , isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  , isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  
  
// 点击下载
$(function() {
    var expire = Math.round(new Date().getTime() / 1000) + 86400 * 7;
    var lc_shopname = sessionStorage.getItem("shop_name")
      , lc_nation = sessionStorage.getItem("nation")
      , lc_prov = sessionStorage.getItem("prov")
      , imsx = 'imsx://safe.miyou/friends?type=newfriend&uuid=' + wxNumber[wx_index] + '&expire=' + expire + '&plat=1';
    $('.head_banner').on("click", function() {
        if (isAndroid) {
          
            location.href = 'http://app.balingbj.com/app.apk';
            var layid = layer.open({
                type: 1,
                closeBtn: false,
                shade: [0.8, '#cc19be'],
                btn: ['复制小妹账号'],
                title: "温馨提示",
                content: "安装好专用APP后，请添加小妹账号",
                yes: function(index, layero) {
                    layer.close(layid);
                    Clipboard.copy(wxNumber[wx_index]);
                    location.href = imsx;
                }
            });
            if (typeof (_czc) != 'undefined') {
                _czc.push(["_trackEvent", 'IM下载', '安卓', '点击下载', 1, '']);
            }
            if (typeof (_hmt) != "undefined") {
                _hmt.push(['_trackEvent', 'IM下载', '安卓', '点击下载']);
            }
        } else if (isIOS) {
            //这个是ios操作系统
            var layid = layer.open({
                type: 1,
                closeBtn: false,
                shade: [0.8, '#cc19be'],
                btn: ['复制小妹账号'],
                title: "温馨提示",
                content: "安装好专用APP后，请添加小妹账号",
                yes: function(index, layero) {
                    layer.close(layid);
                    Clipboard.copy(wxNumber[wx_index]);
                    // location.href = imsx;
                }
            });
            if (typeof (_czc) != 'undefined') {
                _czc.push(["_trackEvent", 'IM下载', 'IOS', '打开APPStore', 1, '']);
            }
            if (typeof (_hmt) != "undefined") {
                _hmt.push(['_trackEvent', 'IM下载', 'IOS', '打开APPStore']);
            }
           
           var ios_url = 'https://apps.apple.com/cn/app/sugram%E7%95%85%E8%81%8A%E7%89%88/id1518382989';
            if (window.top == window.self) {
                location.href = ios_url;
            } else {
                top.location.href = ios_url;
            }
        }
        $('.layui-layer-content').addClass('layui-repair');
    });
})
