import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ DestroyPost }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyPostPayload {
        viewer {
          posts
        },
        deletedId
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'posts',
      deletedIDFieldName: 'deletedId'
    }];
  }

  getVariables() {
    return {
      id: this.props.post.id
    };
  }

  getOptimisticResponse() {
    const {viewer, post} = this.props;
    const viewerPayload = {id: viewer.id};

    return {
      deletedId: post.id
    };
  }
}
