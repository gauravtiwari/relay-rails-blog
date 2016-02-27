/*
  Route: Post Show page
  Root node query for a single post
  params: {post_id}
*/

import Relay from 'react-relay';
const PostRoute = {
  queries: {
    post: () => Relay.QL` query {
      node(id: $id)
    } `,
  },
  name: 'PostRoute',
};

module.exports = PostRoute;
