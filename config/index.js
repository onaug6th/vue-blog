/**
 * 项目webpack基础配置
 * Template version: 1.3.1
 * see http://vuejs-templates.github.io/webpack for documentation.
 */

'use strict'


const path = require('path')

module.exports = {
  //  开发时配置
  dev: {

    //  构建后的静态资源目录
    assetsSubDirectory: 'static',
    //  基于index.html的哪一级开启读取静态资源文件。
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    //  在你的哪个地址打开  can be overwritten by process.env.HOST
    host: 'localhost',
    //  在你的哪个端口打开
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //  自动打开你的浏览器
    autoOpenBrowser: true,
    //  错误信息覆盖你的浏览器
    errorOverlay: true,
    //  报错的时候提醒你
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  //  构建生产时的配置
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    //  静态资源根路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    //  静态资源目录
    assetsSubDirectory: 'static',
    //  基于index.html的哪一级开启读取静态资源文件。
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
