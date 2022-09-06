const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/backend1",
    createProxyMiddleware({
      target: "http://54.177.177.138:8080",
      changeOrigin: true,
    })
  );
};
