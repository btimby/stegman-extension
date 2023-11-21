const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    popup: {
      template: 'src/pages/popup/index.html',
      entry: 'src/pages/popup/main.js',
      title: 'Popup'
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
            'content-script': [
              'src/scripts/highlight.js'
            ]
          }
        }
      }
    }
  }
})
