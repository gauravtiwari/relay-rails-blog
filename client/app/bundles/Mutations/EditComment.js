import Relay from 'react-relay';
import showdown from 'showdown';
const converter = new showdown.Converter();

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{EditComment}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EditCommentPayload {
        comment {
          id,
          body
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          comment: this.props.id,
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.id,
      body: this.props.body,
    };
  }

  getOptimisticResponse() {
    const { body } = this.props;

    return {
      comment: {
        id: this.props.id,
        body: converter.makeHtml(body),
      },
    };
  }
}
