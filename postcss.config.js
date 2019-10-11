module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      state: 3,
      preserve: false,
      features: {
        'nesting-rules': true,
      },
      browsers: [
        'Explorer 11',
        'Edge >= 15',
        'Safari >= 10',
        'Chrome >= 41',
        'Firefox >= 54',
      ],
      autoprefixer: {
        grid: true,
      },
    },
    'css-mqpacker': {},
  },
}
