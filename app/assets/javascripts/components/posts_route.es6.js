var Relay = require('react-relay');
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
