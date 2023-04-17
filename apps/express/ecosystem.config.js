const { lstat } = require('fs')
const { restart } = require('nodemon')

module.exports = {
  apps: [
    {
      name: 'Invoice Backend',
      script: 'npm',
      args: 'run start:prod',
      restart: true,
    },
  ],
}
