const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  cssLoaderOptions: {
    esModule: false,
    sourceMap: false,
    modules: {
      mode: 'local',
    },
  },

  // Other NextConfig Here...
  webpack(config) {
    return config;
  },
});
