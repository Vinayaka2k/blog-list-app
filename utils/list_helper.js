const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
   return blogs.reduce((accumulator, blog) => accumulator+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0)
      return {}
    return blogs.reduce((prevMax, blog) => prevMax.likes > blog.likes ? prevMax : blog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}