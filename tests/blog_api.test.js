const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('../utils/blog_list')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blogObj => blogObj.save())
    await Promise.all(promiseArray)
})

describe('Integration Testing using supertest' ,  () => {

    test('blogs are returned as JSON', async () => {
        await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Random Jokes",
            author: "Harry",
            url: "http://newjokeseveryday.com/uncle-bob/2016/05/01/joke.html",
            likes: 21
          }  
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api.get('/api/blogs')
      
        const titles = response.body.map(blog => blog.title)
      
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
          'Random Jokes'
        )
      })

      test('A blog without title is not added', async () => {
        const newBlog = {
            author: "Harry",
            url: "http://newjokeseveryday.com/uncle-bob/2016/05/01/joke.html",
            likes: 21
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
      })

      test('a blog can be deleted', async() => {
        const blogToDelete = initialBlogs[0]
        await api
                .delete(`/api/blogs/${blogToDelete._id}`)
                .expect(204)
        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(response.body).toHaveLength(initialBlogs.length - 1)
        expect(titles).not.toContain(
                  'React patterns'
                )
    })
})

  

afterAll( () => {
    mongoose.connection.close()
})

