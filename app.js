const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
require('express-async-errors')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB!')
})
.catch(error => {
    logger.error('error connecting to MongoDB ', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app