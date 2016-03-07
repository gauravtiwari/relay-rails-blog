/* global LocalTime, App, Routes */

import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import VoteMutations from '../../Mutations/VoteMutations';

/*
  Component: Comment
  Renders a single comment with author name
*/

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this._handleVote = this._handleVote.bind(this);
  }

  render() {
    const { comment } = this.props;
    const voted = classNames({
      'fa fa-thumbs-up voted': comment.voted,
      'fa fa-thumbs-o-up': !comment.voted,
    });
    return (
      <div key={comment.id} className="media comment">
        <div className="media-body">
          <h4 className="media-heading">
            {comment.user.name}
            <small>
              {LocalTime.relativeTimeAgo(new Date(comment.created_at))}
            </small>
          </h4>
          <div className="comment-body" dangerouslySetInnerHTML={{ __html: comment.body }}>
          </div>
          <div className="post-meta">
             <span className="counters">
              <a onClick={this._handleVote}>
                <span className={voted}></span>
              </a>
               {comment.votes_count}
             </span>
          </div>
        </div>
      </div>
    );
  }

  _handleVote() {
    if (App.loggedIn()) {
      Relay.Store.commitUpdate(new VoteMutations({
        votable: this.props.comment,
        type: 'Comment',
      }));
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }
}


Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};

module.exports = Comment;

/*
  Relay Container: Comment
  Defines data need for this component
*/

const CommentContainer = Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on Comment {
        id,
        body,
        votes_count,
        voted,
        created_at,
        user {
          name
        }
      }
    `,
  },
});

module.exports = CommentContainer;
