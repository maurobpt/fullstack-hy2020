import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import authService from './services/auth'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import Heading from './components/Heading'
import UserDetails from './components/UserDetails'
import AddBlogForm from './components/AddBlogForm'
import './App.css'
import Message from './components/Message'
import {connect} from 'react-redux';
import { initBlogs, createBlog, updateBlog, deleteBlog } from './store/actions/blogActions'
import {login, setAuthData, logout} from "./store/actions/authActions";

const App = (props) => {

  const handleLogInSubmit = credentials => {
    props.login(credentials);
  }

  const handleLogOut = () => {
    props.logout()
  }

  const handleBlogAdded = async newBlog => {
    props.createBlog(newBlog)
  }

  const handleLikeClick = newBlog => {
    props.updateBlog(newBlog)
  }

  const handleBlogDelete = id => {
    props.deleteBlog(id);
  }

  const sortBlogs = unsortedBlogs => {
    return unsortedBlogs.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else {
        return -1
      }
    })
  }

  useEffect(() => {
    const localUser = window.localStorage.getItem('loggedBlogUser')
    if (localUser) {
      const user = JSON.parse(localUser)
      props.setAuthData(user)
      props.initBlogs();
    }
  }, [])

  return (
    <div className="App">
      {props.auth.user ? (
        <Heading text="blogs" />
      ) : (
        <Heading text="log in to application" />
      )}
      {props.notification && <Message notification={props.notification} />}
      {props.auth.user ? (
        <>
          <UserDetails user={props.auth.user} onLogOut={handleLogOut} />
          <AddBlogForm onBlogAdded={handleBlogAdded} />
          <BlogsList
            blogs={props.blogs}
            onLikeClick={handleLikeClick}
            onBlogDelete={handleBlogDelete}
            user={props.auth.user}
          />
        </>
      ) : (
        <>
          <LoginForm onSubmit={handleLogInSubmit} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        notification: state.notification,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initBlogs: () => dispatch(initBlogs()),
        createBlog: blog => dispatch(createBlog(blog)),
        deleteBlog: id => dispatch(deleteBlog(id)),
        updateBlog: blog => dispatch(updateBlog(blog)),
        login: credentials => dispatch(login(credentials)),
        setAuthData: data => dispatch(setAuthData(data)),
        logout: () => dispatch(logout())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
