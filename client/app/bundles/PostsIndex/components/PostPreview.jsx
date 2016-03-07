import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import VoteMutations from '../../Mutations/VoteMutations';

/* global LocalTime, Routes, App */

/*
  Component: PostPreview
  Renders a post preview with author and date
*/

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    this._handleVote = this._handleVote.bind(this);
  }

  render() {
    const { post } = this.props;

    const voted = classNames({
      'fa fa-thumbs-up voted': this.props.post.voted,
      'fa fa-thumbs-o-up': !this.props.post.voted,
    });

    return (
        <div className="post-preview">
          <a href={Routes.post_path(post.id)}>
              <h2 className="post-title">
                {post.title}
              </h2>
              <div className="post-body" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </a>
          <p className="post-meta">
            <span className="count votes">
              <a onClick={this._handleVote}>
                <span className={voted}></span>
              </a>
               {post.votes_count}
            </span>
            <span className="author">
              Posted by:<em>{post.user.name}</em>
            </span>
            <span className="date">
              | {LocalTime.relativeTimeAgo(new Date(post.created_at))}
            </span>
            <span className="count comments">
              <span>|</span> Comments: {post.comments_count}
            </span>
          </p>
        </div>
    );
  }


  _handleVote(event) {
    if (App.loggedIn()) {
      Relay.Store.commitUpdate(new VoteMutations({
        type: 'Post',
        votable: this.props.post,
      }));
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

}

PostPreview.propTypes = {
  post: React.PropTypes.object.isRequired,
};

module.exports = PostPreview;

/*
  Relay Container: Post Preview
  Defines data need for this component
*/

const PostContainer = Relay.createContainer(PostPreview, {
  initialVariables: {
    count: 1000,
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        slug,
        excerpt,
        voted,
        created_at,
        comments_count,
        votes_count,
        user {
          name
        }
      }
    `,
  },
});

module.exports = PostContainer;
