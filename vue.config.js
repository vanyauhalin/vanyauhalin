const ImageminMozjpeg = require('imagemin-mozjpeg')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const path = require('path')

const pack = require('./package.json')

const event = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : ''
const isProd = event === 'build'

const root = {
  assets: (slug) => path.resolve(__dirname, `src/assets/${slug}`),
  components: () => path.resolve(__dirname, 'src/components')
}

module.exports = {
  publicPath: isProd ? `/${pack.name}/` : '/',
  configureWebpack: {
    resolve: {
      alias: {
        img: root.assets('img'),
        js: root.assets('js'),
        scss: root.assets('scss'),
        components: root.components()
      }
    },
    plugins: [
      new ImageminWebpackPlugin({
        disable: !isProd,
        plugins: [
          ImageminMozjpeg({
            quality: 70
          })
        ]
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import '~scss/base/variables.scss';
          @import '~scss/functions/converter.scss';
        `
      }
    }
  }
}
