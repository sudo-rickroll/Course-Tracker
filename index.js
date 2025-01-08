const config = require('./utils/config.js')
const app = require('./app.js')
const logger = require('./utils/logger.js')

app.listen(config.port, () => {
    logger.info(`Application started on port ${config.port}`)
})