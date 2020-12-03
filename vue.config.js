const path = require("path");
module.exports = {
  publicPath: "/",
  runtimeCompiler: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV == "development") {
      config.devServer = {
        proxy: {
          "/": {
            target: process.env.VUE_APP_SERVER_PREFIX,
            changeOrigin: true,
          },
          "/history": {
            target: process.env.VUE_APP_SERVER_PREFIX,
            changeOrigin: true,
          },
          "/traintable": {
            target: process.env.VUE_APP_SERVER_PREFIX,
            changeOrigin: true,
          },
        },
      };
    }
    config.devtool = "source-map";
  },
  transpileDependencies: ["vue-echarts", "resize-detector"],
  chainWebpack: (config) => {
    config.plugins.delete("named-chunks");
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.prettify = false;
        return options;
      });
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/core/")],
          indentedSyntax: true,
        },
        prependData: '@import "~@/assets/sass/main.scss"',
      },
    },
  },
  transpileDependencies: ["vue-echarts", "resize-detector"],
};
