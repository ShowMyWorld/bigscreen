module.exports = {
    publicPath :'./',
    outputDir:process.env.outputDir,
    assetsDir:'static',
    indexPath:'index.html',
    filenameHashing:true,
    // css: {
    //   loaderOptions: {
    //       postcss: {
    //           plugins: [
    //               require('postcss-px2rem')({remUnit: 60}), // 换算的基数
    //           ]
    //       }
    //   }
    // },
    chainWebpack: () => {},
    configureWebpack: () => {},
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        before: app => {}
      },
      css: {
        loaderOptions: {
          // 给 sass-loader 传递选项
          sass: {
            // @/ 是 src/ 的别名 这里写下你的 文件地址
            prependData: `@import "@/assets/css/base.scss";`
          }
        }
      }
}