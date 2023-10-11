import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  addBlog
}) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      {console.log('hello', title)}
      <div>
        title:
        <input type='text'
          value={title}
          name='title'
          onChange={handleTitleChange}
          placeholder='Write blog title here'
          id='title'

        />

      </div>
      <div>
        author:
        <input type='text' value={author} name="author"
          onChange={handleAuthorChange}
          placeholder='Write name of the author here'
          id='author'

        />
      </div>
      <div>
        url:
        <input type='text' value={url} name='url'
          onChange={handleUrlChange}
          placeholder='Write url here'
          id='url'

        />
      </div>
      <div>
        x<button type='submit'>create</button>

      </div>


    </form>
  </div>

)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm