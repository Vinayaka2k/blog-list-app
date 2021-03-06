const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blog_list')

describe('Initial Testing using Jest [UnitTest]', () => {
    test('dummy function returns 1', () => {
        expect(listHelper.dummy(blogs)).toBe(1)
    })
})

describe('total likes Testing using Jest [UnitTest]', () => {
    test('when list has only one blog, equals the likes of that', () => {
      expect(listHelper.totalLikes([blogs[0]])).toBe(7)
    })
    test('when list has multiple blogs, equals sum of likes of all blogs [UnitTest]', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
      })
    test('when list is empty, equals zero [UnitTest]', () => {
        expect(listHelper.totalLikes([])).toBe(0)
      })
})

describe('Fav Blog', () => {
    test('when list has only one blog, that has to be fav [UnitTest]', () => {
      expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0])
    })
    test('when list has multiple blogs, one with max likes is fav [UnitTest]', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
      })
    test('when list has no blogs, return empty object', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
      })
})

describe('Author with most Blogs', () => {
    test('when list has author with multiple blogs, the author with max blogs is returned', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({author: "Robert C. Martin",blogs: 3})
      })
})