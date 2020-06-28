module.exports = {
    publicPath: "./",

    assetsDir: "static",

    outputDir: "dist",

    productionSourceMap: false,

    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        open: true
    }
};
