import Vue from 'vue';

/**
 * 项目配置相关文件
 */
const projectConfig = {
    //  服务地址
    serverUrl: "http://localhost:8080/api/",
    defaultAvatar: `http://wx2.sinaimg.cn/mw690/9311b2dagy1fxk3xwv3gij20fz0dft90.jpg`,
    //  头像列表
    avatarArr: [
        `http://wx2.sinaimg.cn/mw690/9311b2dagy1fxk3xwv3gij20fz0dft90.jpg`
    ]
}

const methods = {
    /**
     * 从一个对象中寻找出嫌疑犯，并且干掉
     * @param {string} 等于多少
     * @param {string} 属性
     * @param {string} 数组
     */
    findObjectInArrayAndDelete: function (value, attr, arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if(item[attr] == value){
                arr.splice(i , 1);
            }
        }
    },
    /**
     * 事件中转，用于全部通用组件
     * @param {string} eventName 事件名称
     * @param {object} item 当前对象
     * @param {any} param 参数
     */
    eventsTransfer(eventName, item, param) {
        
        item['events'] = item['events'] || {};

        const event = item['events'][eventName];

        event && (typeof event['fn'] == "function" ?
            event['fn'].apply(this, event['params'] ? [param, ...event['params']] : [param]) :
            (function(){})());
    }
}

/**
 * 设置Vue原型属性
 * @param {Array} objArr 
 */
function setAttrToVue(objArr) {
    objArr.forEach((item)=>{
        for (let i in item) {
            Vue.prototype[i] ?
                window["console"].info(`${i}已经存在，类型是${typeof (Vue.prototype[i])}`) :
                Vue.prototype[i] = item[i];
        }
    });
}

setAttrToVue([projectConfig, methods]);

export { projectConfig }