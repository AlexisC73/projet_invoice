const { lstat } = require('fs')
const { restart } = require('nodemon')

module.exports = {
  apps: [
    {
      name: 'Invoice Backend',
      script: 'node',
      args: './apps/express/build/index.js',
      restart: true,
    },
  ],
}
