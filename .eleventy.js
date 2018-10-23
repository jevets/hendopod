module.exports = function (config) {
  config.dir = {
    input: './src',
    output: './dist',
  }

  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/pdf')

  return config
}
