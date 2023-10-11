import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('Calling<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm addBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Write blog title here')
  const author = screen.getByPlaceholderText('Write name of the author here')
  const url = screen.getByPlaceholderText('Write url here')
  const createButton = screen.getByText('create')

  await user.type(title, 'Wonder of Japan')
  await user.type(author, 'testAuthor')
  await user.type(url, 'www.word.com')
  //await user.click(createButton)

  fireEvent.submit(createButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Wonder Of Japan')
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('www.word.com')

})