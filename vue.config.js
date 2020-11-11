const ImageminMozjpeg       = require('imagemin-mozjpeg')
// const imageminPngquant      = require('imagemin-pngquant')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const path                  = require('path')

// const pack = require('./package.json')

const event = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : ''
const isProd = event === 'build'

const root = {
  src: (slug) => {
    return path.resolve(__dirname, `src/${slug}`)
  },
  assets: (slug) => {
    return path.resolve(__dirname, `src/assets/${slug}`)
  },
  components: (slug) => {
    return path.resolve(__dirname, `src/components/${slug}`)
  }
}

module.exports = {
  publicPath: isProd ? `/gp_restaurant/` : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'img': root.assets('img'),
        'js': root.assets('js'),
        'scss': root.assets('scss'),
        'blocks': root.components('blocks'),
        'layouts': root.components('layouts'),
        'modules': root.components('modules'),
        'views': root.src('views')
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
          @import '~scss/base/_variables.scss';
          @import '~scss/functions/_converter.scss';
          @import '~scss/mixins/_breakpoints.scss';
        `
      }
    }
  }
}
