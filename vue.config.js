const path = require('path')

const ImageminMozjpeg = require('imagemin-mozjpeg')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default

const pack = require('./package.json')

const event = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : ''
const isProd = event === 'build'

const root = {
  assets: (slug) => path.resolve(__dirname, `src/assets/${slug}`),
  components: (slug) => path.resolve(__dirname, `src/components/${slug}`),
  mixins: () => path.resolve(__dirname, 'src/mixins')
}

module.exports = {
  publicPath: isProd ? `/${pack.name}/` : '/',
  configureWebpack: {
    resolve: {
      alias: {
        images: root.assets('images'),
        scripts: root.assets('scripts'),
        styles: root.assets('styles'),
        default: root.components('default'),
        mixins: root.mixins()
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
        additionalData: '@import "~styles/additional-data.scss";'
      }
    }
  }
}
