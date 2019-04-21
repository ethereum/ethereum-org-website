const path = require('path')

module.exports = {
  plugins: ['@vuepress/register-components', {
    componentsDir: [
      path.resolve(__dirname, 'components')
    ]
  }]
}
