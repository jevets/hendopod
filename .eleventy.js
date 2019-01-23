module.exports = function (config) {
  config.dir = {
    input: './src',
    output: './dist',
  }

  config.addPassthroughCopy('src/favicon.ico')
  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/pdf')

  config.addPassthroughCopy('src/robots.txt')

  return config
}
