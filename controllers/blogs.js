const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')

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
    const body = request.body
    const user = await User.findById(body.userId)
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
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
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