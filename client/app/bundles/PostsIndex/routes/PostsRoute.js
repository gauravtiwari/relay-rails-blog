import Relay from 'react-relay';
/*
  Route: Posts
  Root query to fetch posts collection
  params: {}
*/

module.exports = {
  queries: {
    root: () => Relay.QL` query {
      root
    } `,
  },
  params: {
  },
  name: 'PostsRoute',
};
