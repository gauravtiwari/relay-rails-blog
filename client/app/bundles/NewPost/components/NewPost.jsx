import React from 'react';
import classNames from 'classnames/bind';
/*
  Component: PostPreview
  Renders a post preview with author and date
*/

/* global App, Routes, $ */

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this._createPost = this._createPost.bind(this);
  }

  render() {
    const formClasses = classNames({
      'new-post': true,
      'show': this.props.formToggled,
      'hidden': !this.props.formToggled,
    });

    return (
      <div className={formClasses}>
        <form onSubmit={this._createPost} ref="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea className="form-control" rows="1" id="excerpt" placeholder="Brief intro"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea className="form-control" rows="3" id="body" placeholder="Post body"></textarea>
          </div>
          <button type="submit" className="btn btn-default" onClick={this._createPost}>Post</button>
        </form>
      </div>
    );
  }


  _createPost(event) {
    event.preventDefault();
    const data = {
      title: this.refs.form.elements.title.value,
      excerpt: this.refs.form.elements.excerpt.value,
      body: this.refs.form.elements.body.value,
    };
    if (App.loggedIn()) {
      this.props._handleCreatePost(data);
      $(this.refs.form)[0].reset();
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

}

module.exports = NewPost;
