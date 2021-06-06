const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.CI = "false";
const addCustomize = () => (config) => {
  if (config.output.publicPath) {
    config.output.publicPath =
      process.env.NODE_ENV === "production"
        ? "/react-antd-admin-template/"
        : "/";
  }
  if (config.resolve) {
    config.resolve.extensions.push(".jsx");
  }
  return config;
};
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, 
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  }),

  addWebpackAlias({
    "@": resolve("src"),
  }),
  addCustomize()
);
