const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");

const { join } = require("path");
const { ProvidePlugin } = require("webpack");

const isDev = process.env.NODE_ENV !== "production";
const outputPath = join(process.cwd(), "/dist");
const options = {
  hmr: isDev,
  static: outputPath,
  historyFallback: {
    rewrites: [
      {
        from: '/wps',
        to: (context) => (context.parsedUrl.pathname),
      },
    ],
  },
  /* middleware: (app, builtins) => {
    app.use(builtins.proxy('/api', { target: 'https://localhost:3055' }));
  } */
};

module.exports = {
  entry: ["./src/index.jsx", "webpack-plugin-serve/client"],
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : false,
  watch: isDev,
  output: {
    filename: "bundle.js",
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [isDev && require.resolve("react-refresh/babel")].filter(
                Boolean
              ),
            },
          },
          "eslint-loader",
        ],
      },
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    isDev && new Serve(options),
    isDev && new ReactRefreshWebpackPlugin(),
    isDev && new ForkTsCheckerWebpackPlugin(),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: `/public/index.html`
    })
  ].filter(Boolean),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  watch: isDev,
};
