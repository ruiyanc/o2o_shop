// Date.prototype.Format=function (fmt) {
//   var o = {
//       'M+': this.getMonth() + 1,
//       'd+': this.getDate(),
//       'h+': this.getHours(),
//       'm+': this.getMinutes(),
//       's+': this.getSeconds(),
//       'q+': Math.floor((this.getMonth() + 3) / 3),
//       'S': this.getMilliseconds()
//   } ;
//     if (/(y+)/.test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     }
//     for (var k in o) {
//         if (new RegExp("(" + k + ")").test(fmt)) {
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
//                 : (("00" + o[k]).substr(("" + o[k]).length)));
//         }
//         return fmt;
//     }
// };

/**
 * @return {string}
 */
function Format(Date,str){
    var obj = {
        Y: Date.getFullYear(),
        M: Date.getMonth() + 1,
        D: Date.getDate(),
        H: Date.getHours(),
        Mi: Date.getMinutes(),
        S: Date.getSeconds()
    }
    // 拼接时间 hh:mm:ss
    var time = ' ' +supplement(obj.H) + ':' + supplement(obj.Mi) + ':' + supplement(obj.S);
    // yyyy-mm-dd
    if(str.indexOf('-') > -1){
        return obj.Y + '-' + supplement(obj.M) + '-' + supplement(obj.D) + time;
    }
    // yyyy/mm/dd
    if(str.indexOf('/') > -1){
        return obj.Y + '/' + supplement(obj.M) + '/' + supplement(obj.D) + time;
    }
}
// 位数不足两位补全0
function supplement(nn){
    return nn = nn < 10 ? '0' + nn : nn;
}



function changeVerifyCode(img) {
    img.src = "../Kaptcha?" + Math.floor(Math.random() * 100);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return '';
}