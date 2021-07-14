module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    jasmine: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest", "jasmine"],
  rules: {},
};
