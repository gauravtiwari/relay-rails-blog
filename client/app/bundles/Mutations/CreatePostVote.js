import Relay from 'react-relay';

export default class extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{CreatePostVote}`;
  }

  getFatQuery() {
    return Relay.QL`
    fragment on CreatePostVotePayload {
      post {
        votes_count,
        voted
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
    ];
  }

  getVariables() {
    return {
      votable_type: this.props.votable_type,
      votable_id: this.props.post.id,
    };
  }


  getOptimisticResponse() {
    const { post } = this.props;
    return {
      post: {
        id: post.id,
        votes_count: parseInt(post.votes_count, 0) + 1,
        voted: true,
      },
    };
  }
}
