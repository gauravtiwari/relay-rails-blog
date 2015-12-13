var Relay = require('react-relay');
var Post = require('./post.es6.js');

/*
  Route: Post Show page
  Root node query for a single post
  params: {post_id}
*/

var PostRoute = {
  queries: {
    post: () => Relay.QL` query {
      node(id: $postId)
    } `,
  },
  params: {
    postId: window.location.pathname.split('/')[2]
  },
  name: 'PostRoute',
}

module.exports = PostRoute;
