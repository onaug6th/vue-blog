import Vue from 'vue';

/**
 * 项目配置相关文件
 */
const projectConfig = {
    //  restful服务地址
    serverUrl: "http://localhost.com:3000/api/",

    //  图片cdn地址
    imgCdnUrl: "http://localhost.com:3000/api/",

    //  我的头像
    myAvatar: "https://avatars1.githubusercontent.com/u/24285577?s=460&amp;v=4",

    //  回复文章默认头像，胖虎
    defaultAvatar: `http://wx2.sinaimg.cn/mw690/9311b2dagy1fxk3xwv3gij20fz0dft90.jpg`,

    //  回复文章头像列表
    avatarArr: [
        `http://wx2.sinaimg.cn/mw690/9311b2dagy1fxk3xwv3gij20fz0dft90.jpg`
    ]
}

/**
 * 设置Vue原型属性
 * @param {Array} objArr 
 */
function setAttrToVue(objArr) {
    objArr.forEach((item)=>{
        for (let i in item) {
            Vue.prototype[i] ?
                window["console"].info(`${i}已经存在，类型是${typeof (Vue.prototype[i])}。为了避免篡改已有属性，不做覆盖。`) :
                Vue.prototype[i] = item[i];
        }
    });
}

setAttrToVue([projectConfig]);

export { projectConfig }
