import ReactOnRails from 'react-on-rails';
import Posts from '../PostsIndex/components/Posts';
import Post from '../PostsShow/components/Post';
import PostsRoute from '../PostsIndex/routes/PostsRoute';
import PostRoute from '../PostsShow/routes/PostRoute';
import Relay from 'react-relay';

// This is how react_on_rails can see the Posts in the browser.
ReactOnRails.register({
  Posts,
  Post,
});

ReactOnRails.registerRoute({
  PostsRoute,
  PostRoute,
});

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);
