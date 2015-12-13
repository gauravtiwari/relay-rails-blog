
// Setup app into global name space
var React = window.React = global.React = require('react');
var ReactDOM = window.ReactDOM = global.ReactDOM = require('react-dom');
var ReactDOMServer = window.ReactDOMServer = global.ReactDOMServer = require('react-dom/server');
var Relay = window.Relay = global.Relay = require('react-relay');

var app = window.app = global.app = {};

var Posts = require('./components/posts.es6.js');
var Post = require('./components/post.es6.js');
var PostsRoute = require('./components/posts_route.es6.js');
var PostRoute = require('./components/post_route.es6.js');
app.Posts = Posts;
app.PostsRoute = PostsRoute;
app.Post = Post;
app.PostRoute = PostRoute;

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      currentUserId: localStorage.getItem('current_user_id')
    },
  })
);


$(document).ready(function() {
  window.ReactRelayRailsUJS.renderRelayComponents = function(component, route, node) {
    ReactDOM.render(
      <Relay.RootContainer
       Component={component}
       route={route}
       renderLoading={function() {
          return <div className="loader">
            <span className="fa fa-spin fa-spinner"></span>
          </div>;
        }} />,
      node
    );
  }
});

