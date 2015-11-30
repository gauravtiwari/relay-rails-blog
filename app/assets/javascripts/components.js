

// Setup app into global name space
var app = window.app = global.app = {};

// Component::Manifest
var NavBar = require('./components/navbar.es6.js');
var Footer = require('./components/footer.es6.js');

// Include into app namespace
app.NavBar = NavBar;
app.Footer = Footer;



