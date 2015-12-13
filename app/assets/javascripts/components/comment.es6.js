var React = require('react');
var Relay = require('react-relay');

class Comment extends React.Component {
  render() {
    var {comment} = this.props;
    return (
      <div className='media comment'>
        <div className='media-body'>
          <h4 className='media-heading'>
            { comment.user.name }
            <small>
              { LocalTime.relativeTimeAgo(new Date(comment.created_at)) }
            </small>
          </h4>
          <div className="comment-body" dangerouslySetInnerHTML={{__html: comment.body }}>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Comment;

var CommentContainer = Relay.createContainer(Comment, {
    fragments: {
        post: () => Relay.QL`
          fragment on Comment {
            id,
            body,
            user {
              id, name
            }
          }
        `
    }
});

module.exports = CommentContainer;
