const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.get('/:id', (request, response, next) => {
        Blog.findById(request.params.id).then(blog => {
            if(blog)
                response.json(blog)
            else
                response.status(404).end()
        }).catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    })
    blog.save().then(newBlog => {
        response.json(newBlog)
    }).catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id).then(deletedBlog => {
        response.status(204).end()
    }).catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    })
    Blog.findByIdAndUpdate(request.params.id, blog, {new:true}).then(newBlog => {
        response.json(newBlog)
    }).catch(error => next(error))
})

module.exports = blogRouter