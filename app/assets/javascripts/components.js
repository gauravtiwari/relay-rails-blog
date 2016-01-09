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
var Post = require('./components/post.es6.js');
var PostsRoute = require('./components/posts_route.es6.js');
var PostRoute = require('./components/post_route.es6.js');
App.Posts = Posts;
App.PostsRoute = PostsRoute;
App.Post = Post;
App.PostRoute = PostRoute;

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

/*****************  GraphiQL EDITOR *****************/

// Renders the GraphiQL editor
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

// Render <GraphiQL /> into the body.
var defaultQuery = "# Use GraphQL to query data from \n# a Ruby on Rails backend\n\n query Viewer {\n # Find all posts \n  root  {\n    # And get data\n   posts(first: 20)  {\n  edges  {\n  node{\n  id,\n   title,\n   body,\n    # for user you can access\n   user {\n      name     \n},\n    # for comments you can access\n comments(first: 5, order: \"-id\")  {\n edges {\n node {\n id, body, user {\n id, name  \n}  \n}  \n}  \n}        \n}     \n}     \n}     \n}  \n\n}\n\n";

// Parse the search string to get url parameters.
 var search = window.location.search;
 var parameters = {};
 search.substr(1).split('&').forEach(function (entry) {
   var eq = entry.indexOf('=');
   if (eq >= 0) {
     parameters[decodeURIComponent(entry.slice(0, eq))] =
       decodeURIComponent(entry.slice(eq + 1));
   }
 });

 // if variables was provided, try to format it.
 if (parameters.variables) {
   try {
     parameters.variables =
       JSON.stringify(JSON.parse(parameters.variables), null, 2);
   } catch (e) {
     // Do nothing, we want to display the invalid JSON as a string, rather
     // than present an error.
   }
 }

// Pass the default fetcher arguments
function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

// Render only on editor page
$(document).ready(function() {
  if ($('#editor').length > 0) {
    ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} query={parameters.query || defaultQuery} />,
      document.getElementById('editor'));

    // Insert Go back link on editor toolbar
    var back_button = $('<div />', {
                        "class": 'back right',
                          text: "Return to posts",
                          click: function(e){
                            e.preventDefault();
                            window.location.href = "/"
                          }
                        }
                      );
    $(back_button).insertAfter('.execute-button');


  }
});

/***************** / GraphiQL EDITOR *****************/
