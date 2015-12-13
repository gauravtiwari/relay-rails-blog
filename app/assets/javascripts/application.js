//= require_self
//= require app
//= require jquery.turbolinks
//= require js-routes
//= require local_time
//= require environment
//= require tracker
//= require current_user
//= require_tree ./policies
//= require components
// require turbolinks // Disable it until we figured it out
//= require react_relay_ujs

// Setup React in global scope
window.$ = window.jQuery = require('jquery')
require('jquery-ujs')

// import GraphiQL from 'graphiql';
// import fetch from 'isomorphic-fetch';



// function graphQLFetcher(graphQLParams) {
//   return fetch(window.location.origin + '/graphql', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(graphQLParams),
//   }).then(response => response.json());
// }

// $(document).ready(function() {
//   ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />,
//     document.getElementById('editor'));
// });
