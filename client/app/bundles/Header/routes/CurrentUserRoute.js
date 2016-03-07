import Relay from 'react-relay';

/*
  Route: CurrentUserRoute
*/

module.exports = {
  queries: {
    user: () => Relay.QL` query {
      root
    } `,
  },
  params: {
  },
  name: 'CurrentUserRoute',
};
