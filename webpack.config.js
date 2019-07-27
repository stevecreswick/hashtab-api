const webpack = require("webpack");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = (async () => {
  const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
  console.log(slsw.lib.entries);

  return {
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    entry: slsw.lib.entries,
    output: {
      libraryTarget: "commonjs2",
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },
    optimization: {
      // We no not want to minimize our code.
      minimize: false
    },
    performance: {
      // Turn off size warnings for entry points
      hints: false
    },
    target: "node",
    plugins: [
      new webpack.DefinePlugin({
        AWS_ACCOUNT_ID: `${accountId}`
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader"
        }
      ]
    },

    // webpack-node-externals
    // Define 'externals' which won't be included in the bundle that webpack generates.
    // We're excluding everything in node_modules.
    externals: [nodeExternals()]
  };
})();
