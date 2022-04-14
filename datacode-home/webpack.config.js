const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "datacode",
    projectName: "home",
    webpackConfigEnv,
    argv,
  });

  const standalonePlugin = defaultConfig.plugins.find(
    (p) => p.constructor.name === "StandaloneSingleSpaPlugin"
  );

  standalonePlugin.options.importMapUrl = new URL(
    "http://localhost:9000/importmap.json"
  );

  const externals = [/^rxjs\/?.*$/, /^@datacode\/.*$/];

  if (webpackConfigEnv.standalone) {
    externals.push("react", "react-dom");
  }

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals,
  });
};
