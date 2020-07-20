/* 
    过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/* 
    邮箱校验
*/
export function validateEmail(value) {
    // 邮箱正则表达式
    let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
    return reg.test(value) ? true : false;
}

/* 
    验证码校验
*/
export function validateCodes(value) {
    // 校验码正则表达式
    let reg = /^[a-z0-9]{6}$/
    return reg.test(value) ? true : false;
}

/* 
    密码校验
*/
export function validatePass(value) {
    // 校验码正则表达式
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value) ? true : false;
}







