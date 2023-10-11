import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, user , deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='show'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          {console.log(updateLikes)}
            likes {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <div>
          {blog.user!== undefined && blog.user.name}
        </div>
        <div>
          {blog.user!== undefined && blog.user.username === user.username
   && <button onClick={deleteBlog}>remove</button>}
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
}


export default Blog