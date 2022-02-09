const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

describe('API Testing for Users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password_root', 10)
        const user = new User({
            username: 'root',
            name: 'root',
            passwordHash
        })
        await user.save()
    })

    test('creation of a new user succeeds', async() => {
        const usersAtStart = await usersInDb()
        const newUser = {
            username: 'user',
            name: 'user',
            password: 'password_user'
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
        expect(usersAtEnd.map(user => user.username)).toContain(newUser.username)
    })

    
    test('creation fails if username is already taken', async() => {
        const usersAtStart = await usersInDb()
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'password_root'
        }
        await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('username must be unique')
        const usersAtEnd = await usersInDb()
        expect(usersAtStart).toEqual(usersAtEnd)
    })
    
})