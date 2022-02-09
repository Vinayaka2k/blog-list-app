const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
    const blog = Blog.findById(request.params.id)
    if(blog)
        response.json(blog)
    else
        response.status(404).end()
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    })
    const newBlog = await blog.save()
    response.json(newBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
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