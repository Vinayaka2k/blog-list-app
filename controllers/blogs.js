const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFromRequest = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer'))
        return authorization.substring(7)
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = Blog.findById(request.params.id)
    if(blog)
        response.json(blog)
    else
        response.status(404).end()
})

blogRouter.post('/', async (request, response, next) => {
    const token = getTokenFromRequest(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id)
        return response.status(401).json({error: 'token missing or invalid'})
    const user = await User.findById(decodedToken.id)

    const body = request.body
    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    })
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = getTokenFromRequest(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id)
        return response.status(401).json({error: 'token missing or invalid'})
        
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const token = getTokenFromRequest(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id)
        return response.status(401).json({error: 'token missing or invalid'})

    const body = request.body
    const blog = {
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    }
    const updatedBlog = Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updatedBlog)
})

module.exports = blogRouter