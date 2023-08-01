
const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const TerserPlugin = require("terser-webpack-plugin");

const cwd = process.cwd();

module.exports = (env) => {
  const { TARGET } = env;

  return {
    mode: TARGET === 'production' ? 'production' : 'development',

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: TARGET === 'production' ? false : 'inline-source-map',

    entry: {
      code: './src/plugin.ts',
    },

    module: {
      rules: [
        { 
          test: /\.tsx?$/, 
          use: 'ts-loader', 
          exclude: /node_modules/
        },
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        "@plugins": path.resolve(cwd, '../../packages')
      }
    },

    output: {
      filename: '[name].js',
      path: path.resolve(cwd, 'dist'),
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
      ],
    },

    plugins: [
      new DotEnv({ path: `.env.${TARGET}` }),
      new webpack.DefinePlugin({
        'global': {}, // Fix missing symbol error when running in developer VM
      }),
      new WebpackShellPluginNext({
        onBuildEnd:{
          scripts: ['./build-ui.sh'],
          blocking: false,
          parallel: true
        },
        env: {
          TARGET,
        }
      }),
    ],
  };
}