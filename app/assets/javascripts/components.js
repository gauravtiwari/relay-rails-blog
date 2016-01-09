// Setup app into global name space
var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
var ReactDOMServer = window.ReactDOMServer = require('react-dom/server');
var Relay = window.Relay = require('react-relay');

// User same origin to send cookies through network layer
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin'
  })
);

// Setup global components
var Posts = require('./components/posts.es6.js');
var PostsRoute = require('./components/posts_route.es6.js');
App.Posts = Posts;
App.PostsRoute = PostsRoute;

// Temporary hack to render relay components dynamically
// TODO: Look into supporting turbolinks
$(document).ready(function() {
  ReactRelayRailsUJS.renderRelayComponents = function(component, route, node) {
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
