const path = require('path');
module.exports = {




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
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },

    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false
}