const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules/chart.js')
        ]
      }
    ]
  }
};
