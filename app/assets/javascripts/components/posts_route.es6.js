var Relay = require('react-relay');
var PostsRoute = {
  queries: {
    posts: () => Relay.QL` query { root } `,
  },
  params: {
  },
  name: 'PostsRoute',
}
module.exports = PostsRoute;
