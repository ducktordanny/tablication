/* eslint-disable @typescript-eslint/no-var-requires */
const {merge} = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: path.join(__dirname, '../build/js'),
  },
  mode: 'production'
});
