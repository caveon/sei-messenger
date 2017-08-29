module.exports = {
  entry: {
    app: './src/SeiMessenger.js',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  output: {
    filename: 'SeiMessenger.min.js',
    library: 'SeiMessenger',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}
