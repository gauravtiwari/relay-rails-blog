var React = require('react');
var Relay = require('react-relay');

/*
  Component: Comment
  Renders a single comment with author name
*/

class Comment extends React.Component {
  render() {
    var {comment} = this.props;
    return (
      <div key={comment.id} className='media comment'>
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

/*
  Relay Container: Comment
  Defines data need for this component
*/

var CommentContainer = Relay.createContainer(Comment, {
    fragments: {
        comment: () => Relay.QL`
          fragment on Comment {
            body,
            created_at,
            user {
              name
            }
          }
        `
    }
});

module.exports = CommentContainer;
