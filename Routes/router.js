const glob = require('glob')
const { Router } = require('express')

module.exports = () =>
  glob
    .sync('**/*.route.js', { cwd: `${__dirname}/` })
    // eslint-disable-next-line global-require,import/no-dynamic-require,security/detect-non-literal-require
    .map(filename => require(`./${filename}`))
    .filter(router => Object.getPrototypeOf(router) === Router)
    .reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true }))
