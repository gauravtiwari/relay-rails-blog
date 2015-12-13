var React = require('react');
var Relay = require('react-relay');

class PostPreview extends React.Component {
  render() {
    var {post} = this.props;
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
          </p>
        </div>
    );
  }
}
module.exports = PostPreview;

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
