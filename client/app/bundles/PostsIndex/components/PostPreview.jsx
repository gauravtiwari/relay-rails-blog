import React from 'react';
import Relay from 'react-relay';
import classNames from 'classNames';
import CreatePostVote from '../../Mutations/CreatePostVote';
import DestroyPostVote from '../../Mutations/DestroyPostVote';

/*
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
            <span className="author">
              Posted by:<em>{post.user.name}</em>
            </span>
            <span className="date">
              | {LocalTime.relativeTimeAgo(new Date(post.created_at))}
            </span>
            <span className="count comments">
              <span>|</span> Comments: {post.comments_count}
            </span>
            <span className="count votes">
              <span>|</span>
              <a onClick={this._handleVote}>
                <span className={voted}></span>
              </a>
               {post.votes_count}
            </span>
          </p>
        </div>
    );
  }


  _handleVote(event) {
    if (App.loggedIn()) {
      const onSuccess = () => {
        console.log('Mutation successful!');
      };
      const onFailure = (transaction) => {
        var error = transaction.getError() || new Error('Mutation failed.');
        console.error(error);
      };
      if (this.props.post.voted) {
        Relay.Store.commitUpdate(new CreatePostVote({ post: this.props.post }), {onFailure, onSuccess})
      } else {
        Relay.Store.commitUpdate(new DestroyPostVote({ post: this.props.post }), {onFailure, onSuccess})
      }
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

}

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
