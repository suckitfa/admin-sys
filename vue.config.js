const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: true,
    lintOnSave: true,
    chainWebpack: (config) => {
        // 目录的简写,方便开发过程
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('pages', resolve('src/pages'))
            .set('utils', resolve('src/utils'))
    }
}