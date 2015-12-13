var Relay = require('react-relay');
/*
  Route: Posts
  Root query to fetch posts collection
  params: {}
*/

var PostsRoute = {
  queries: {
    root: () => Relay.QL` query {
      root
    } `,
  },
  params: {
  },
  name: 'PostsRoute',
}

module.exports = PostsRoute;
