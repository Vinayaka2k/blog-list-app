const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const res = blogs.reduce((accumulator, blog) => accumulator+blog.likes, 0)
    console.log(res)
    return res
}

module.exports = {
  dummy,
  totalLikes
}