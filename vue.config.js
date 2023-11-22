const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      template: 'src/index.html',
      entry: 'src/main.js',
      title: 'Index'
    },
    popup: {
      template: 'src/pages/popup/index.html',
      entry: 'src/pages/popup/main.js',
      title: 'Popup'
    },
    compose: {
      template: 'src/pages/compose/index.html',
      entry: 'src/pages/compose/main.js',
      title: 'Compose'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/scripts/background.js'
        },
        contentScripts: {
          entries: {
            'highlight': [
              'src/scripts/highlight.js'
            ]
          }
        }
      }
    }
  }
})
