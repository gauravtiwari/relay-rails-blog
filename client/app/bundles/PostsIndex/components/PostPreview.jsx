import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import VoteMutations from '../../Mutations/VoteMutations';
import DeletePost from '../../Mutations/DeletePost';
import Moment from 'moment';

/* global Routes, App */

/*
  Component: PostPreview
  Renders a post preview with author and date
*/

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    this._handleVote = this._handleVote.bind(this);
    this._deletePost = this._deletePost.bind(this);
  }

  render() {
    const { post } = this.props;
    const voted = classNames({
      'fa fa-thumbs-up voted': this.props.post.voted,
      'fa fa-thumbs-o-up': !this.props.post.voted,
    });

    const tags = post.tags.map((tag) => {
      return (<a key={Math.random()} className="post-tag" href={Routes.tag_path(tag)}>{tag}</a>);
    });

    return (
        <div className="post-preview">
          <a href={Routes.post_path(post.id)}>
            <h2 className="post-title">
              {post.title}
            </h2>
          </a>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div className="tags">
            {tags}
          </div>
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
              | {Moment(Moment.utc(post.created_at).toDate()).fromNow().toString()}
            </span>
            <span className="count comments">
              <span>|</span> Comments: {post.comments_count}
            </span>
            {App.currentUser().isCurrent(this.props.post.user_id) ?
              <a href="#" className="delete" onClick={this._deletePost}>
                <span>|</span> Delete
              </a> : ''
            }
          </p>
        </div>
    );
  }

  _deletePost(event) {
    event.preventDefault();
    if (App.loggedIn() && App.currentUser().isCurrent(this.props.post.user_id)) {
      Relay.Store.commitUpdate(new DeletePost({
        post: this.props.post,
        viewer: this.props.root,
      }));
    } else {
      window.location.href = Routes.new_user_session_path();
    }
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
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        slug,
        excerpt,
        voted,
        user_id,
        created_at,
        comments_count,
        tags,
        votes_count,
        user {
          name,
        }
      }
    `,
  },
});

module.exports = PostContainer;
