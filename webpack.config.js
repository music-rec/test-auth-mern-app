const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  html: path.join(__dirname, 'src/index.html'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules')
}

const coreCssRules = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      sourceMap: true,
      localIdentName: '[local]___[hash:base64:5]',
      minimize: process.env.NODE_ENV === 'production'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: { path: './postcss.config.js' }
    }
  }
]

const common = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [paths.src, 'node_modules']
  },
  output: {
    path: paths.dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        exclude: paths.node_modules
      },
      { test: /\.svg$/, use: [{ loader: 'raw-loader' }] },
      { test: /\.(png|gif)(\?.*)?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: paths.html })
  ]
}

const development = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:8070 `,
    'webpack/hot/only-dev-server',
    paths.src
  ],
  devtool: 'cheap-eval-source-map',
  // devtool: 'source-map',
  devServer: {
    hot: true,
    stats: {
      chunks: false,
      assets:false
    },
    //quiet: true,
    port: '8070'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', ...coreCssRules],
        include: [paths.src, paths.node_modules]
      }
    ]
  },
  performance: { hints: false },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin({ port: 9001 })
  ]
}

const production = {
  bail: true,
  entry: {
    app: paths.src
  },
  devtool: 'source-map',
  output: {
    path: paths.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ loader: [...coreCssRules] }),
        include: [paths.src, paths.node_modules]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new CleanPlugin([paths.dist]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function (module) {
        if ( typeof module.context === 'string' ) {
          return module.context.includes('node_modules')
        } else {
          return false
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
}

const environment = process.env.NODE_ENV === 'development' ? development : production
module.exports = merge(common, environment)
