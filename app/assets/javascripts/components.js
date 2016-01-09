// Setup app into global name space
var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
var ReactDOMServer = window.ReactDOMServer = require('react-dom/server');
var Relay = window.Relay = require('react-relay');


// Setup global components
var Posts = require('./components/posts.es6.js');
var PostsRoute = require('./components/posts_route.es6.js');

// On document ready render the component
$(document).ready(function(){
  ReactDOM.render(
    <Relay.RootContainer
     Component={Posts}
     route={PostsRoute}
     renderLoading={function() {
        return <div className="loader">
          <span className="fa fa-spin fa-spinner"></span>
        </div>;
      }} />,
    document.getElementById("posts")
  );
});
