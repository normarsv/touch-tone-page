require("dotenv").config();
const Dotenv = require("dotenv-webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const withPlugins = require("next-compose-plugins");
const less = require("@zeit/next-less");
const css = require("@zeit/next-css");
const optimizedImages = require("next-optimized-images");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const nextConfig = {
  webpack: (config, { dev, isServer, server }) => {
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      })
    );

    if (!dev && !isServer) {
      if (Array.isArray(config.optimization.minimizer) === false) {
        config.optimization.minimizer = [];
      }
      config.optimization.minimizer.push(new TerserPlugin({}));
      config.node = {
        fs: "empty",
      };
    }

    if (config.mode === "production") {
      if (Array.isArray(config.optimization.minimizer) === false) {
        config.optimization.minimizer = [];
      }
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    }

    return config;
  },
};

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}
module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        optimizeImagesInDev: true,
      },
    ],
    [
      css,
      {
        cssLoaderOptions: {
          url: false,
        },
      },
    ],
    [
      less,
      {
        cssModules: false,
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
  ],
  nextConfig
);
