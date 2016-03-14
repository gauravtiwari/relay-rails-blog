import ReactOnRails from 'react-relay-on-rails';
import Posts from '../PostsIndex/components/Posts';
import Post from '../PostsShow/components/Post';
import RootRoute from '../PostsIndex/routes/RootRoute';
import PostRoute from '../PostsShow/routes/PostRoute';
import CurrentUser from '../Header/components/CurrentUser';
import Relay from 'react-relay';

/* global $, App */

// This is how react_on_rails can see the Posts in the browser.
ReactOnRails.register({
  Posts,
  Post,
  CurrentUser,
});

ReactOnRails.registerRoute({
  RootRoute,
  PostRoute,
});

$(document).on('turbolinks:load', () => {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql', {
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': App.csrfToken(),
      },
    })
  );
});
