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

const mostBlogs = (blogs) => {
    let d = {}
    blogs.map(blog => d[blog.author] ? d[blog.author]++ : d[blog.author]=1)

    let max_num_blog = 0, max_author
    for (const [author, num_blog] of Object.entries(d)){
        if(num_blog > max_num_blog){
          max_num_blog = num_blog
          max_author = author
        }
    }
    return {'author': max_author, 'blogs': max_num_blog}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}