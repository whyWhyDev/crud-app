const path = require("path");
const { webpack } = require("webpack");

module.exports = () => {

  console.log("process.env.node_env: ", process.env.NODE_ENV);

  return {
    entry: "./client/index.js",
    devServer: {
      publicPath: "/build/",
      historyApiFallback: true,
      contentBase: "./client",
      proxy: {
        "/": "http://localhost:3000",
        "/contact": "http://localhost:3000",
        "/company": "http://localhost:3000",
      },
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },  
  };
};
