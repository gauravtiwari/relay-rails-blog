var React = require('react');
var Relay = require('react-relay');
var classNames = require('classnames');
import PostVoteMutation from '../mutations/vote/post_vote_mutation.es6.js';
import PostUnVoteMutation from '../mutations/vote/post_unvote_mutation.es6.js';

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
    var {post} = this.props;

    var voted = classNames({
      'fa fa-thumbs-up voted': this.props.post.voted,
      'fa fa-thumbs-o-up': !this.props.post.voted
    });

    return (
        <div className="post-preview">
          <a href={Routes.post_path(post.id)}>
              <h2 className="post-title">
                { post.title }
              </h2>
              <div className="post-body" dangerouslySetInnerHTML={{__html: post.excerpt }} />
          </a>
          <p className="post-meta">
            <span className="author">
              Posted by:<em>{ post.user.name }</em>
            </span>
            <span className="date">
              | { LocalTime.relativeTimeAgo(new Date(post.created_at)) }
            </span>
            <span className="count comments">
              <span>|</span> Comments: { post.comments_count }
            </span>
            <span className="count votes">
              <span>|</span>
              <a onClick={this._handleVote}>
                <span className={voted}></span>
              </a>
               { post.votes_count }
            </span>
          </p>
        </div>
    );
  }


  _handleVote(event) {
    if(App.loggedIn()) {
      if(this.props.post.voted) {
        Relay.Store.update(new PostUnVoteMutation({post: this.props.post}))
      } else {
        Relay.Store.update(new PostVoteMutation({post: this.props.post}))
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

var PostContainer = Relay.createContainer(PostPreview, {
	initialVariables: {
	  count: 1000
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
        `
    }
});

module.exports = PostContainer;
