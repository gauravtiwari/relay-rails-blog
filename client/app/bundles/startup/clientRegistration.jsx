import ReactOnRails from 'react-relay-on-rails';
import Posts from '../PostsIndex/components/Posts';
import Post from '../PostsShow/components/Post';
import PostsRoute from '../PostsIndex/routes/PostsRoute';
import PostRoute from '../PostsShow/routes/PostRoute';
import CurrentUser from '../Header/components/CurrentUser';
import CurrentUserRoute from '../Header/routes/CurrentUserRoute';
import Relay from 'react-relay';

// This is how react_on_rails can see the Posts in the browser.
ReactOnRails.register({
  Posts,
  Post,
  CurrentUser,
});

ReactOnRails.registerRoute({
  PostsRoute,
  PostRoute,
  CurrentUserRoute,
});

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);
