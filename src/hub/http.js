import querystring from 'querystring';
import axios from 'axios';
import query from './query';


/**
 *
 * @param reqUrl 请求url
 * @param params 传参数值
 * @returns {string} 过滤后url和参数字符
 */
function reqUrlParam(reqUrl, params) {
    if (params) {
        let reqParam = '';
        // 过滤value=空字符串、null、undefined 键值对
        let configParams = query.paramFilter(params);
        reqParam = querystring.stringify(configParams);
        reqUrl += (reqParam ? `?${reqParam}` : reqParam);
    }
    return reqUrl;
}


/**
 * http GET 请求接口数据
 * @param url: string 请求url地址 如 /pubsrv/industrys/
 * @param config?: object={} 配置项 如 { params： {name: value}, _this: vue.$this, _key: vue.$data.keyName} }
 */
function get(url, config = {params: null, _this: null, _key: null, loading: false}, cb) {
    // params 传参对象
    // _this vue实例对象
    // _key vue实例data.key名称
    // loading 是否加载动画 view页面请求应用
    let {params, _this, _key, loading = false} = config;
    let reqUrl = `${url}`;
    reqUrl = reqUrlParam(reqUrl, params);
    axios.get(reqUrl).then(function (resp) {
        let respData = resp.data;
        if (respData.code === '0') {
            _this[_key] = respData.data || {};
            if(cb && typeof cb === 'function'){
                cb(_this);
            }
        }
        // 结束进度条
    }).catch(function (err) {
        // 错误结束进度条
    });
}

export default {
    // 过滤请求参数中空值
    reqUrlParam,
    get
}
