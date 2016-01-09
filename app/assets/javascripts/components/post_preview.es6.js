var React = require('react');
var Relay = require('react-relay');

/*
  Component: PostPreview
  Renders a post preview with author and date
*/

class PostPreview extends React.Component {
  constructor(props) {
   super(props);
  }

  render() {
    var {post} = this.props;
    return (
        <div className="post-preview">
          <a href="#">
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
               votes: { post.votes_count }
            </span>
          </p>
        </div>
    );
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
