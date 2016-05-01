import Relay from 'react-relay';

export default class extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { CreatePost }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePostPayload {
        postEdge,
        viewer {
          posts,
        },
    }`;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'posts',
        edgeName: 'postEdge',
        rangeBehaviors: {
          '': 'append',
          'order(-id)': 'append',
        },
      },
    ];
  }

  getVariables() {
    return {
      viewer_id: this.props.viewer.id,
      title: this.props.data.title,
      excerpt: this.props.data.excerpt,
      body: this.props.data.body,
    };
  }
}
