const path = require('path');
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    configureWebpack: (config) => {
        config.resolve = {  //配置解析别名
            extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
            alias: {
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './public'),
                'components': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'views': path.resolve(__dirname, './src/views'),
                'data': path.resolve(__dirname, './src/data'),
            }
        }
    },
    // 生产环境是否生成 sourceMap文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import"./src/styles/main.scss";`
            }
        },
        // 启用CSS modules for all cs / pre-processor files
        requireModuleExtension: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: false, // 编译完成是否打开网页
        host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, //访问端口
        https: false, // 编译失败时刷新页面
        hot: true, // 开启热加载
        hotOnly: false,
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: false,
            errors: false
        },
        proxy: { // 设置代理
            '/devapi': {
                target: 'http://www.web-jshtml.cn/productapi',
                changeOrigin: true, // 允许跨域
                pathRewrite: { // 重写路径
                    '^/devapi': ''
                }
            }
        },
        before: app => {

        }

    },
    /* 
        第三方插件配置
    */
    pluginOptions: {},
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false
}