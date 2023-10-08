const lodash = require("lodash")


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogs_likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs_likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const most_likes = blogs.reduce((acc, blog) => acc = acc.likes > blog.likes ? acc : blog, 0)
  console.log(most_likes);
  return most_likes
}


const mostBlogs = (blogs) => {

  const count = lodash.countBy(blogs, "author");

  const author = Object.keys(count).reduce((a, b) => {
    return count[a] > count[b] ? a : b;
  });

  return {
    author: author,
    blogs: count[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs

}