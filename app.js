const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const express = require('express')
const app = express()

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB!')
})
.catch(error => {
    logger.error('error connecting to MongoDB ', error.message)
})

module.exports = app