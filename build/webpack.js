const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getConfig = () => {
  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
      publicPath: '/__webpck_conf_define_path'
    },
    module: {
      rules: [
        {
          test: /\.css$/,

          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                //publicPath: 'extract-loader-path',
                publicPath: 'my_img_assets_path'
              }
            },
            {
              loader: 'css-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.png/,
          loader: 'file-loader',
          options: {
            //publicPath: '/file-loader/path',
            // postTransformPublicPath: function(p) {
            //     console.log(p)
            //   return p();
            // }
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __webpack_public_path__: `window.__publicPath`
        // __webpack_public_path__:`some_static_path`
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
      })
      // Everything else **first**.
      // Write out stats file to build directory.
      // new StatsWriterPlugin({
      //   filename: "stats.json" // Default
      // })
    ]
  };
};

//https://webpack.js.org/api/node/

webpack(getConfig(), (err, stats) => {
  if (err || stats.hasErrors()) {
    const info = stats.toJson();
    // Handle errors here
    console.error(info.errors);
  } else {
    // Done processing
    console.log('build done!');
  }
});
