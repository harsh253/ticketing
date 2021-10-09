module.exports = {
  // Adding so that skaffold polls for nextjs changes every 300 seconds
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
