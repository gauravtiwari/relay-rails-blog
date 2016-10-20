import Relay from 'react-relay';

export default class extends Relay.Mutation {

  getMutation() {
    return this.props.votable.voted ?
      Relay.QL`mutation {DestroyVote}` : Relay.QL`mutation {CreateVote}`;
  }

  getFatQuery() {
    if (this.props.type === 'Post') {
      return this.props.votable.voted ?
        Relay.QL`fragment on DestroyVotePayload {
          post {
            votes_count,
            voted
          }
        }` : Relay.QL`
        fragment on CreateVotePayload {
          post {
            votes_count,
            voted
          }
        }`;
    } else {
      return this.props.votable.voted ?
        Relay.QL`fragment on DestroyVotePayload {
            comment {
              votes_count,
              voted
            }
          }` : Relay.QL`
          fragment on CreateVotePayload {
            comment {
              votes_count,
              voted
            }
          }`;
    }
  }

  getConfigs() {
    if (this.props.type === 'Post') {
      return [
        {
          type: 'FIELDS_CHANGE',
          fieldIDs: {
            post: this.props.votable.id,
          },
        },
      ];
    } else {
      return [
        {
          type: 'FIELDS_CHANGE',
          fieldIDs: {
            comment: this.props.votable.id,
          },
        },
      ];
    }
  }

  getVariables() {
    return {
      votable_type: this.props.votable_type,
      votable_id: this.props.votable.id,
    };
  }


  getOptimisticResponse() {
    const { votable } = this.props;
    const count = this.props.votable.voted ?
      votable.votes_count - 1 :
      votable.votes_count + 1;

    if (this.props.type === 'Post') {
      return {
        post: {
          id: votable.id,
          votes_count: count,
          voted: !this.props.votable.voted,
        },
      };
    } else {
      return {
        comment: {
          id: votable.id,
          votes_count: count,
          voted: !this.props.votable.voted,
        },
      };
    }
  }
}
