import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, users, handleLikes, handleRemove }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          const user = users.find(user => blog.user.id ? user.id === blog.user.id  : user.id === blog.user )
          return(
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={handleLikes}
              handleRemove={handleRemove}
            />
          )
        })
      }
    </div>
  )
}

export default Blogs
