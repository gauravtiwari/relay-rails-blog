import Relay from 'react-relay';
import showdown from 'showdown';
import moment from 'moment';
const converter = new showdown.Converter();

/* global App */

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{CreateComment}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCommentPayload {
        commentEdge,
        post {
          comments_count
        }
    }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          post: this.props.post.id,
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'post',
        parentID: this.props.post.id,
        connectionName: 'comments',
        edgeName: 'commentEdge',
        rangeBehaviors: {
          '': 'append',
          'order(-id)': 'prepend',
        },
      },
    ];
  }

  getVariables() {
    return {
      post_id: this.props.post.id,
      body: this.props.body,
    };
  }

  getOptimisticResponse() {
    const { post, body } = this.props;

    return {
      post: {
        id: post.id,
        comments_count: post.comments_count + 1,
      },
      commentEdge: {
        node: {
          body: converter.makeHtml(body),
          is_owner: true,
          voted: false,
          votes_count: 0,
          created_at: moment().utc().valueOf(),
          user: {
            name: App.currentUser().name,
          },
        },
      },
    };
  }
}
