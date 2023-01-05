const { lstat } = require('fs')
const { restart } = require('nodemon')

module.exports = {
  apps: [
    {
      name: 'Invoice Backend',
      script: './build/index.js',
      restart: true,
    },
  ],
}
