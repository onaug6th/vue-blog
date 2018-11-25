'use strict'

//  版本检测，并马上执行
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('正在构建生产包...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  构建中发生了问题。\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' 唔，居然没有遇到BUG，打包成功了。\n'))
    console.log(chalk.yellow(
      '  提示: 构建后的文件请置于开启http服务的服务器中运行。\n' +
      '  在浏览器中访问服务器路径即可。\n'
    ))
  })
})
