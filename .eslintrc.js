module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
  ],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.jsx"],
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
      },
    },
  ],
};
