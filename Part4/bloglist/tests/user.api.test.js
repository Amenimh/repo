const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })

  await user.save()
})


describe('user testing', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if username is not added', async () => {

    const usersBefore = await helper.usersInDb()

    const newUser = {
      name: 'testname1',
      password: 'testpassword'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(response.body)
    expect(response.body.error).toContain('Must provide username or password!')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('fails if password is not provides', async () => {

    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'testusername2',
      name: 'testname2',

    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Must provide username or password!')
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('fails if username is length is shorter than 3.', async () => {

    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'testname3',
      password: 'testipassword3'

    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(response.body)

    expect(response.body.error).toContain('username or password length must be  atleast minimium 3 characters long')


    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })



})
afterAll(() => {
  mongoose.connection.close()
})