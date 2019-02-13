/**
 * @author onaug6th
 * @description 
 * 
 * 2018-10-15
 * 
 * cli  配置文件 vue.config.js
 * 
 * cli  默认配置文件    node_modules\@vue\cli-service\lib\options.js
 * cli  项目入口文件    node_modules\@vue\cli-service\lib\config\app.js
 * cli  开发及生产配置  node_modules\@vue\cli-service\lib\config\*
 * cli  控制台信息      node_modules\@vue\cli-service\lib\commands\serve.js
 * 
 * vue脚手架工具的大致运行流程
 * npm run serve
 * 在package.json中寻找可执行的脚本，其中会执行 vue-cli-service 这个命令。
 * 这个命令并不是全局命令，而是存在 node_modules\@vue\cli-service\package.json。
 * 该配置文件的bin属性指向运行，bin/vue-cli-service.js
 * 一系列实例化 最后跑起服务
 */

//  node.js 路径模块
const path = require("path");

/**
 * 返回当前目录路径加目录名称的完整路径
 * 例如 vue.config.js 处于 C:\Users\administrator\Desktop\onaug6th
 * dir为 src/assets
 * 函数就会返回补全路径 C:\Users\administrator\Desktop\onaug6th + src/assets
 * @param {*} dir 
 */
const resolve = (dir) => {
    return path.join(__dirname, dir);
}

/**
 * 项目部署基础
 * 默认情况下，我们假设你的应用将被部署在域的根目录下
 * 例如：https://www.onaug6th.com/
 * 默认："/"
 * 如果您的应用程序部署在子路径中，则需要在这指定子路径
 * 例如：https://www.onaug6th.com/blog/
 * 需要将它改为"/blog/"
 * 如果是用于本地预览，可以改为 "./"
 */
const BASE_URL = {
    "development": "/",
    "production": "/"
};

/**
 * 导出自定义项目配置
 */
module.exports = {

    baseUrl: BASE_URL[process.env.NODE_ENV],

    /**
     * see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     * 如果你不需要使用eslint，把lintOnSave设为false即可
     */
    lintOnSave: false,

    //  资源文件输出路径
    outputDir: "dist",

    /**
     * 调整Vue CLI 内部的 webpack配置
     * 一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
     * 具体配置请看    https://cli.vuejs.org/zh/config/#chainWebpack
     * 
     * ####   即使你没有配置任何copy plugin，vue-cli都会默认会将根目录的public中所有的文件打包到根目录
     */
    chainWebpack: config => {
        //  设置路径别名，方便项目中缩写引用
        config.resolve.alias
            .set("@", resolve("src"))
    },

    /**
     * webpack配置
     * @type { object | function }
     * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
     * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
     * #####    注意！！！这个配置是配置webpack的，而上述的chainWebpack能更加细粒度的调整内部cli-webpack配置
     */
    configureWebpack: {
        plugins: []
    },

    // 打包时生成.map文件
    productionSourceMap: false,

    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 "" ，即空字符串
    devServer: {}
}
