/* global App, Routes */

import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import VoteMutations from '../../Mutations/VoteMutations';
import EditComment from '../../Mutations/EditComment';
import DeleteComment from '../../Mutations/DeleteComment';
import showdown from 'showdown';
const converter = new showdown.Converter();
import Moment from 'moment';

/*
  Component: Comment
  Renders a single comment with author name
*/

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this._handleVote = this._handleVote.bind(this);
    this._saveComment = this._saveComment.bind(this);
    this._toggleForm = this._toggleForm.bind(this);
    this._destroyComment = this._destroyComment.bind(this);
    this.state = { editing: false };
  }

  render() {
    const { comment } = this.props;
    const voted = classNames({
      'fa fa-thumbs-up voted': comment.voted,
      'fa fa-thumbs-o-up': !comment.voted,
    });

    const commentClasses = classNames({
      'media comment': true,
      'editing-comment': this.state.editing,
    });

    const manageClasses = classNames({
      'manage-links': true,
      'is-owner': this.props.comment.is_owner,
    });

    const toggleText = this.state.editing ? 'Close' : 'Edit';
    return (
      <div key={comment.id} className={commentClasses}>
        <div className="media-body">
          <h4 className="media-heading">
            {comment.user.name}
            <small>
              {Moment(Moment.utc(comment.created_at).toDate()).fromNow().toString()}
            </small>
            <div className={manageClasses}>
              <a href="#" onClick={this._toggleForm}>{toggleText}</a>
              <a href="#" onClick={this._destroyComment} className="delete">Delete</a>
            </div>
          </h4>
          <div className="comment-body"
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(comment.body),
            }}
          >
          </div>
          <div className="media-body comment-form">
            <textarea defaultValue={comment.body} onKeyUp={this._saveComment} />
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

  _destroyComment(event) {
    event.preventDefault();
    if (!this.props.comment.is_owner) return;
    Relay.Store.commitUpdate(new DeleteComment({
      comment: this.props.comment,
      comments: this.props.post.comments,
      post: this.props.post,
    }));
  }

  _toggleForm(event) {
    event.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  _saveComment(event) {
    event.preventDefault();
    if (!this.props.comment.is_owner) return;

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      alert(error);
    };

    const onSuccess = () => {
      this.setState({ editing: false });
    };

    if (event.keyCode === 13) {
      Relay.Store.commitUpdate(new EditComment({
        id: this.props.comment.id,
        body: event.target.value,
      }), { onFailure, onSuccess });
    }
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
  comments: React.PropTypes.object,
  post: React.PropTypes.object,
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
        is_owner,
        votes_count,
        voted,
        created_at,
        user {
          name,
        },
      }
    `,
  },
});

module.exports = CommentContainer;
