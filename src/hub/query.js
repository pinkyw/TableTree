import querystring from 'querystring';


/**
 * 过滤param.value===空字符串、null、undefined 键值对
 * @param param参数object
 * @returns {Object} 过滤后的param
 */
function paramFilter(param) {
    // 仅过滤object对象
    if (typeof param === 'object') {
        if(param.constructor === FormData) {//form data 不做处理
            return param;
        }
        if(param.constructor !== Array) {
            let keys = Object.keys(param).filter(function (k) {
                if (param[k] === '' || (!param[k] && param[k]!=0)) {
                    return false;
                }
                return true;
            });

            let newParam = {};
            for (let k of keys) {
                newParam[k] = param[k];
            }

            return newParam;
        }
    }
    return param;
}

export default {
    // 参数值为空字符串、null、undefined过滤掉
    paramFilter: paramFilter,
}