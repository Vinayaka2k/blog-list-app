const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blog_list')

describe('Inital Test', () => {
    test('dummy function returns 1', () => {
        expect(listHelper.dummy(blogs)).toBe(1)
    })
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      expect(listHelper.totalLikes([blogs[0]])).toBe(7)
    })
})