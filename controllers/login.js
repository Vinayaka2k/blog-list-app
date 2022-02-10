const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({username: body.username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if(!passwordCorrect)
        return response.status(401).json({error: 'invalid username or password'})
    const userToken = {
        username: user.username,
        id: user._id
    }    
    const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60*60 })
    response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter


