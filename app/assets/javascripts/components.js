
var ReactDom = require('react-dom');
var Relay = require('react-relay');

// Setup app into global name space
var app = window.app = global.app = {};

// Component::Manifest
var NavBar = require('./components/navbar.es6.js');
var Footer = require('./components/footer.es6.js');
var Posts = require('./components/posts.es6.js');
var PostsRoute = require('./components/posts_route.es6.js');

// Include into app namespace
app.NavBar = NavBar;
app.Footer = Footer;


$(document).ready(function() {
  ReactDOM.render(
    <Relay.RootContainer
      Component={Posts}
      route={PostsRoute}
    />,
    document.getElementById('app')
  );
});


