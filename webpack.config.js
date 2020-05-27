/*
* @Author: lin.zhenhui
* @Date: 2020-03-08 12:22:09
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-27 18:53:04
*/

const fs                    = require('fs')
const path                  = require('path')
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

deleteFile('./dist')

module.exports = (env, argv) => {
  const devMode = argv.mode == 'development'
  return {
    output: {
      filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename      : '[name].[hash].css',
        chunkFilename : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template : './public/index.html',
        favicon  : './public/favicon.ico'
      }),
      // new FaviconsWebpackPlugin('./public/logo.png'),
    ],
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test    : /\.m?js$/,
        exclude : /(node_modules|bower_components)/,
        use: {
          loader  : 'babel-loader',
          options : {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test : /\.html$/,
        use  : {
          loader  : 'html-loader',
          options : { minimize : !devMode }
        }
      },
      {
        test : /\.(sa|sc|c)ss$/,
        use  : [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // postcss-loader 要比 sass-loader 前，否则 cssnano 不无效结果。
          'postcss-loader',
          'sass-loader'
        ],
      }]
    },
    externals: {
      'crypto-js' : 'CryptoJS',
      axios       : 'axios',
      jsencrypt   : 'JSEncrypt'
    },
    resolve: {
      alias: {
        '@/api'        : path.resolve(__dirname, 'src/api/'),
        '@/components' : path.resolve(__dirname, 'src/components/'),
        '@/data'       : path.resolve(__dirname, 'src/data/'),
        '@/pages'      : path.resolve(__dirname, 'src/pages/'),
        '@/utils'      : path.resolve(__dirname, 'src/utils/')
      }
    },
    devServer: {
      port: 9021
    }
  }
}

function deleteFile(path) {
  let files = []
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(file => {
      const curPath = path + '/' + file
      if(fs.statSync(curPath).isDirectory()) {
        deleteFile(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
