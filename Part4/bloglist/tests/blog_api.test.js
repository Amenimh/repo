const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})


test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
    await mongoose.connection.close()
})


test('The unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()
    const response = await api.get(`/api/blogs`)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    expect(response.body[0].id).toBeDefined()

})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'testApiTitle',
        author: 'testAuthor',
        url: '******',
        likes: 69
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'testApiTitle'
    )
})

test('if the likes property missing, default 0.', async () => {
    const newBlog = {
        title: 'testApiTitles',
        author: 'testAuthor',
        url: 'https://fullstackopen.com/'
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
    expect(response.body.likes).toEqual(0)

})

test('blog without title and url is not added.', async () => {
    const newBlog = {
        author: 'testAuthor',
        likes: 10,

    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)

})


test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)


    expect(blogsAtEnd).not.toContain(blogToDelete)
})


test('Updating likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToupdate = blogsAtStart[0]


    await api
        .put(`/api/blogs/${blogToupdate.id}`)
        .send({ likes: 25 })
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0];
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    expect(updatedBlog.likes).toBe(25)
})







