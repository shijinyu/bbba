const webpack = require('webpack');
const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const cwd = process.cwd();

const config = {
  framework: 'html',
  entry: {
    include: 'page',
    template: 'view/layout.njk'
  },
  alias: {
    '@asset': path.join(cwd, 'asset'),
    '~modules': './node_modules',
    jquery: './node_modules/jquery/dist/jquery.js'
  },
  externals: {
    window: 'window'
  },
  loaders: {
    scss: true,
    nunjucks: {
      enable: true,
      test: /\.njk$/,
      options: {
        searchPaths: ['./widget', './test']
      }
    },
    nj: {
      enable: true,
      test: /\.nj$/,
      use: 'nunjucks-loader'
    },
    expose: {
      enable: true,
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }]
    }
  },
  plugins: {
    definePlugin: {
      name: new webpack.DefinePlugin({
        'window.__API_URL__': NODE_ENV === 'development' ? JSON.stringify('http://127.0.0.1:8080') : JSON.stringify(''),
        'window.__CROS__': NODE_ENV === 'development' ? JSON.stringify('127.0.0.1:8080') : JSON.stringify('*')
      }),
      enable: true
    }
  },
  done() {

  }
};
if (NODE_ENV === 'development') {
  config['dev-tool'] = 'source-map';
  config.devServer = {
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  };
}
if (NODE_ENV === 'production') {
  config.plugins.cleanPlugin = {
    name: new CleanWebpackPlugin([
      path.resolve(cwd, './public/*')
    ], {
      root: cwd
    })
  };
  config.plugins.uglifyJs = {
    name: new UglifyPlugin({
      parallel: 2,
      uglifyOptions: {
        ecma: 8
      }
    })
  };
}
module.exports = config;
