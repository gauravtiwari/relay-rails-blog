import Relay from 'react-relay';
import showdown from 'showdown';
const converter = new showdown.Converter();

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
          comments
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
        comments_count: parseInt(post.comments_count, 0) + 1,
      },
      commentEdge: {
        node: {
          body: converter.makeHtml(body),
          created_at: new Date().toUTCString(),
          user: {
            name: App.CurrentUser().name,
          },
        },
      },
    };
  }
}
