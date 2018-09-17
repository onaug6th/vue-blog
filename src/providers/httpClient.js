//  第三方http请求库
import axios from 'axios';

import { projectConfig } from './common';

/**
 * 请求工具方法 httpClient
 * @param {object} options 请求参数对象配置，详情请参考 https://www.kancloud.cn/yunye/axios/234845
 */
const httpClient = function (options) {

    return new Promise((resolve, reject) => {
        try {

            options = options || {};

            let opt = $.extend(true, {}, httpClient.DEFAULT_CONFIG, options);

            const token = "tempToken";
            
            //  如果存在token和userid，在每次请求都携带过去
            if (token) {
                if (Object.prototype.toString.call(opt.headers) === "[object Object]") {
                    opt.headers.token = token;
                } else {
                    opt.headers = {
                        "token": token
                    }
                }
            }

            axios(opt).then(response => {
                const resultData = response.data;

                //  如果为2，说明token过期。重新登陆
                if (resultData.code == 2) {
                    
                }
                resolve(resultData);
                
            }).catch((...args) => {
                //  后端服务不稳定，为保险起见，所有请求加一次自动重连。
                if(!options.reConnected){
                    window["console"].info(`${options.url} 第一次请求接口失败，正在尝试第二次重新链接。`);
                    options.reConnected = true;
                    return httpClient.reConnected(options , resolve);
                }
                const failMsg = {
                    url: opt.url,
                    ajaxOpt: opt,
                    failArgs: args
                }

                httpClient.failLog.push(failMsg);
                window["console"].info(`因为未知的情况进入了错误回调，请检查错误信息排查错误。`);
                window["console"].info(failMsg);
                reject(failMsg);
            });

            httpClient.queryCount++;
        } catch (e) {
            window["console"].info(`通用请求方法发生了错误`, e);
        }
    });
}

/**
 * 速效救心丸，重新链接
 * @param {*} options 请求配置
 * @param {*} resolve 释放
 */
httpClient.reConnected = function(options, resolve){
    setTimeout(()=>{
        httpClient(options).then((response)=>{
            resolve(response);
        });
    },1000);
}

/**
 * httpClient Post请求
 * @param {*} url 地址
 * @param {*} data 参数（PostBody）
 * @param {*} options 配置
 */
httpClient.post = function (url, data, options) {
    const opt = $.extend({
        method: "post",
        url: url,
        data: data
    }, options);
    return httpClient(opt);
}

/**
 * httpClient put请求
 * @param {*} url 地址
 * @param {*} data 参数（PostBody）
 * @param {*} options 配置
 */
httpClient.put = function (url, data, options) {
    const opt = $.extend({
        method: "put",
        url: url,
        data: data
    }, options);
    return httpClient(opt);
}

/**
 * httpClient Get请求
 * @param {*} url 地址
 * @param {*} param 参数（url query）
 * @param {*} options 配置
 */
httpClient.get = function (url, param, options) {
    const opt = $.extend({
        method: "get",
        url: url,
        params: param
    }, options);
    return httpClient(opt);
}

/**
 * httpClient Delete请求
 * @param {*} url 地址
 * @param {*} options 配置
 */
httpClient.delete = function (url, options) {
    const opt = $.extend({
        method: "delete",
        url: url
    }, options);
    return httpClient(opt);
}

/**
 * 默认请求配置
 * 详情请参考官方文档 https://www.kancloud.cn/yunye/axios/234845
 */
httpClient.DEFAULT_CONFIG = {
    // `method` 是创建请求时使用的方法,默认是 get
    method: "get",
    // 可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: projectConfig.serverUrl,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json',
    //  请求传递的参数
    data: {

    },
    //  请求头
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
}

/**
 * 设置默认配置属性
 * @param {*} key 键
 * @param {*} value 值
 */
httpClient.setDefaultConfig = function (key, value) {
    httpClient[key] = value;
}

//  请求计数
httpClient.queryCount = 0;

//  失败信息
httpClient.failLog = [];

window.httpClient = httpClient;

export default httpClient;
