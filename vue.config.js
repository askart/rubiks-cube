module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/rubiks-cube/" : "/",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-source-map";
    } else if (process.env.NODE_ENV === "production") {
      config.devtool = false;
    }
  }
};
