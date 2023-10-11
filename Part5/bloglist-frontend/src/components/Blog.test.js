import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title or author', () => {
  const blog = {
    title: 'Japan in the winter',
    author: 'test Author',
    url: 'world.com',
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')


  expect(div).toHaveTextContent(
    'Japan in the winter'
  )


})


test('Details shown after clicking view button', async () => {
  const blog = {
    ttitle: 'Japan in the winter',
    author: 'test Author',
    url: 'world.com',
    likes: 10,
    user: {
      id: 'testId'
    }
  }
  const user = {
    id: 'testId'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.show')

  expect(div).toHaveTextContent('world.com')

  expect(div).toHaveTextContent('10')
})



test('likes button clicked twice', async () => {
  const blog = {
    ttitle: 'Japan in the winter',
    author: 'test Author',
    url: 'world.com',
    likes: 10,

  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateLikes={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
