import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{DestroyComment}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyCommentPayload {
        post {
          comments_count
        },
        deletedId
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
        type: 'NODE_DELETE',
        parentName: 'post',
        parentID: this.props.post.id,
        connectionName: 'comments',
        deletedIDFieldName: 'deletedId',
      },
    ];
  }

  getVariables() {
    return {
      post_id: this.props.post.id,
      id: this.props.comment.id,
    };
  }

  getOptimisticResponse() {
    const { post, comment } = this.props;
    const postPayload = { id: post.id, comments_count: post.comments_count - 1 };
    return {
      post: postPayload,
      deletedId: comment.id,
    };
  }
}
