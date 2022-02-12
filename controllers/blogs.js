const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const endpointHandler = require(`../handlers/endpointHandler`);

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    return response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
    const blog = Blog.findById(request.params.id);
    if (blog)
        return response.json(blog);
    else
        return response.status(404).end();
});

blogRouter.post('/', async (request, response, next) => {
    endpointHandler.runWithValidation(request, response, token => {
        const user = await User.findById(token);

        const body = request.body;
        const blog = new Blog({
            title: body.title,
            url: body.url,
            author: body.author,
            likes: body.likes,
            user: user._id
        });
        const newBlog = await blog.save();
        user.blogs = user.blogs.concat(newBlog._id);
        await user.save();
        return response.status(201).json(newBlog);
    });
});

blogRouter.delete('/:id', async (request, response) => {
    endpointHandler.runWithValidation(request, response, token => {
        await Blog.findByIdAndRemove(request.params.id);
        return response.status(204).end();
    });
});

blogRouter.put('/:id', async (request, response) => {
    endpointHandler.runWithValidation(request, response, token => {
        const body = request.body;
        const blog = {
            title: body.title,
            url: body.url,
            author: body.author,
            likes: body.likes
        };
        const updatedBlog = Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
        return response.json(updatedBlog);
    });
});

module.exports = blogRouter;