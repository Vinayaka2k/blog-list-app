const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('../utils/blog_list')

beforeEach(async () => {
    await Blog.deleteMany({})

    initialBlogs.map(async blog =>  {
        let blogObj = new Blog(blog)
        await blogObj.save()
    })
})

describe('Integration Testing using supertest' ,  () => {

    test('blogs are returned as JSON', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    }, 100000)
})

afterAll( () => {
    mongoose.connection.close()
})

