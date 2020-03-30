const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  pageExtensions: ['js'],
  compress: !isDev,
  target: 'server',
  webpack: (config, { buildId, dev }) => {
    if (!dev) {
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    }
    return config
  },
  excludeFile: str => /\*.{spec,test}.js|*.json|/.test(str),
}

module.exports = withPlugins([withImages()], nextConfig)
