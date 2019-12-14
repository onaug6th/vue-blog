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
    myAvatar: "https://avatars1.githubusercontent.com/u/24285577",

    //  文章默认背景图片
    articleDefaultBg: "https://avatars1.githubusercontent.com/u/24285577?s=460&amp;v=4",

    //  回复文章默认头像，胖虎
    defaultAvatar: `https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/common/head.jpg`,

    //  回复文章头像列表
    avatarArr: [
        `https://onaug6th-1253668581.cos.ap-guangzhou.myqcloud.com/common/head.jpg`
    ]
}

const methods = {
    /**
     * 从一个数组对象中寻找出嫌疑犯
     * @param {string} 等于多少
     * @param {string} 属性
     * @param {string} 数组
     */
    findObjectInArray: function (value, attr, arr) {
        let result = {};
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if(item[attr] == value){
                result = item;
            }
        }
        return result;
    },
    /**
     * 日期格式化
     * @param {*} date yyyy-mm-dd hh:mm:ss
     * @param {*} en 高端大气上档次的洋气英文格式化？
     */
    dateFormat(date, en){
        if(!date){
            return false;
        }
        const yymmdd = date.split(" ")[0];
        const monthEN = [
            "hello", "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const yy = yymmdd.split("-")[0];
        const mm = yymmdd.split("-")[1];
        const dd = yymmdd.split("-")[2];
        
        return (en ? `${monthEN[+mm]}  ${dd}, ${yy}` : `${yy}.${mm}.${dd}`);
    },
    /**
     * 标签格式化
     * @param {*} tags 
     * @param {array} tagList
     */
    tagFormat(tags, tagList){
        return !tags ? [] : tags.split(",").map((item) =>{
            return methods.findObjectInArray(item, "id", tagList);
        });
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
                window["console"].info(`${i}已经存在，类型是${typeof (Vue.prototype[i])}。为了避免篡改已有属性，不做覆盖。`) :
                Vue.prototype[i] = item[i];
        }
    });
}

setAttrToVue([methods, projectConfig]);

export { projectConfig }
