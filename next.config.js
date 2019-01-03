const withCSS = require('@zeit/next-css');

module.exports = {
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
  ...withCSS(),
};
