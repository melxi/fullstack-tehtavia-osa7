import blogService from '../services/blogs'

const byLikes = (a, b) => b.likes - a.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  case 'CREATE_BLOG':
    return [...state, action.data].sort(byLikes)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data).sort(byLikes)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    })
    return createdBlog
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type:  'REMOVE_BLOG',
      data: blog
    })
  }
}

export const commentBlog = (comment, id) => {
  return async dispatch => {
    const content = await blogService.comment(comment, id)
    dispatch({
      type: 'COMMENT_BLOG',
      data: content
    })
  }
}

export default blogReducer