const path = require("path");
const glob = require("glob");
const I18nPlugin = require("i18n-webpack-plugin");

const PATHS = {
  build: path.join(__dirname, "i18n-build"),
  i18nDemo: path.join(__dirname, "index.js"),
};

const TRANSLATIONS = [{ language: "en" }].concat(
  glob.sync("./lang/*.json").map(file => ({
    language: path.basename(file, path.extname(file)),
    translation: require(file),
  }))
);

module.exports = TRANSLATIONS.map(({ language, translation }) => ({
  entry: {
    index: PATHS.i18nDemo,
  },
  output: {
    path: PATHS.build,
    filename: `[name].${language}.js`,
  },
  plugins: [new I18nPlugin(translation)],
}));