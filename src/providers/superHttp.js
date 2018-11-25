//  第三方http请求库
import Axios from 'axios';
//  项目配置
import { projectConfig } from './common';

//  默认请求配置
const requestConfig = {
    baseURL: projectConfig.serverUrl
};

//  根据默认配置，创建axios实例对象
const axios = Axios.create(requestConfig);

/**
 * 请求拦截器
 * 在发起请求前，我们会检查vuex中是否存在token等数据，如果存在的话。每次请求都会携带过去。
 * 
 * tip:
 * 1. 如果需要修改baseURL 只需要在调用方法的地方，传递配置 { baseURL : "https://www.timewait.com" }即可覆盖原有配置。
 */
axios.interceptors.request.use((config) => {
    
    const token = "tempToken";

    if(token){
        //  往axios默认请求头配置中设置token
        config.headers["token"] = token;
    }

    return config;
}, (error) => {
    //  对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 响应拦截器
 * 请求结束后，我们可能会根据后端返回状态码进行不同的提示。
 * 假设 result.code 为00时为正常请求，为04时是登录状态失效。
 * 此时可以在这里统一做提示， “请重新登录”。
 * 也可以根据调用时传递的参数，message : true 时提示对应的信息。
 */
axios.interceptors.response.use((response) => {
    
    const resultData = response.data;
    
    if(resultData.code == "04"){
        alert(response.config.message || "请重新登录");
    }

    return resultData;
}, (error) => {
    
    //  对响应错误做点什么
    return Promise.reject(error);
});

export default axios;
