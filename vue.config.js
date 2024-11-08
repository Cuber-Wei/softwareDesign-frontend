const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("raw-loader") // 使用 raw-loader 处理 .md 文件
      .loader("raw-loader")
      .end();
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin({})],
  },
});
