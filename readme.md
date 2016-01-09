### WIP: Part2: Blog application

This blog is an exploration exercise to understand two new technologies - GraphQL and Relay. We are using standard rails application together with npm for handling front-end dependencies.

It's a work in progress and this repository will update as we move further with this application. The intention is to explore the integration to stage where we can get a clear understanding about these two new technologies and how they might fit in a real world application and framework.

### Status

**Currently**, the application supports reading and creating data from and on server.

# Tutorial:
1. **Introduction:** https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-getting-started-955a49d251de
2. **Part1:** https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-creating-types-and-schema-b3f9b232ccfc#.6micmekh2
3. **Part3:** https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-first-relay-powered-react-component-cb3f9ee95eca#.82h24lg4h

#### Current features
* List posts using react component

### Demo Links
* [Demo blog](https://relay-rails-blog.herokuapp.com/)
* [GraphiQL query editor](https://relay-rails-blog.herokuapp.com/editor)

### Resources

* [Facebook Relay](https://facebook.github.io/relay/): Official relay docs
* [GraphQL](http://facebook.github.io/graphql/): Official GraphQL spec
* [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) & [graphql-relay-ruby](https://github.com/rmosolgo/graphql-relay-ruby): For defining GraphQL schema and Relay implementation in Ruby GraphQL classes, and getting Rails to speak GraphQL.
* ```browserify-rails```: Command-line options required to do transpilation, e.g., —plugin, etc.
