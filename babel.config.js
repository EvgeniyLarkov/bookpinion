/* eslint-disable no-undef */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/transform-runtime"],
    [
      "babel-plugin-styled-components",
      {
        ssr: false,
      },
    ],
  ],
};
