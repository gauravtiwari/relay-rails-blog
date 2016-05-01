### WIP: Demo blog application powered by Rails, react, graphql and Relay.

This blog is an exploration excerise to understand two new technologies - GraphQL and Relay. We are using standard rails application together with npm for handling front-end dependencies.

It's a work in progress and this repository will update as we move further with this application. The intention is to explore the integration to stage where we can get a clear understanding about these two new technologies and how they might fit in a real world application and framework.

### Status

**Currently**, the application supports reading and creating data from and on server.

# Tutorial:
1. **Introduction:** https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-getting-started-955a49d251de
2. **Part1:** https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-creating-types-and-schema-b3f9b232ccfc#.6micmekh2
2. **Part2:**
https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-first-relay-powered-react-component-cb3f9ee95eca#.ssisfzsm0
3. **Part3:**
https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-dynamic-component-rendering-2be4e208ef92#.gvw5kevg1
4. **Part4**
https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-authentication-and-authorisation-f7c07ebb47b3#.2y1h14x2p
4. **Part5** - Integrating Webpack with `react-on-rails`
https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-moving-to-webpack-9c6a420b4eea#.60z7xg1j0
5. **Final** - Wrap up
https://medium.com/@gauravtiwari/graphql-and-relay-on-rails-wrap-up-500c67522cd2#.gt0b65fa7

#### Current features
* List posts
* List comments of the posts
* Infinite Scroll - posts and comments
* Show author info, votes and comments count
* Mutations to create comments and votes
* Edit and Update comments
* Create and Delete posts
* Add a react native app [https://github.com/gauravtiwari/graphql-blog-mobile](https://github.com/gauravtiwari/graphql-blog-mobile)

### Demo Links
* [Demo blog](https://relay-rails-blog.herokuapp.com/)

### Resources

* [Facebook Relay](https://facebook.github.io/relay/): Official relay docs
* [GraphQL](http://facebook.github.io/graphql/): Official GraphQL spec
* [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) & [graphql-relay-ruby](https://github.com/rmosolgo/graphql-relay-ruby): For defining GraphQL schema and Relay implementation in Ruby GraphQL classes, and getting Rails to speak GraphQL.
* ```Webpack```: Module loader

### TODOs
* Explore Relay subscriptions to hook it with ActionCable [http://graphql.org/blog/subscriptions-in-graphql-and-relay/](http://graphql.org/blog/subscriptions-in-graphql-and-relay/)
* Probably more...

### Running locally
To run the application, please just clone the repo and run it like so:

```
git clone git@github.com:gauravtiwari/relay-rails-blog.git
cd relay-rails-blog
npm install
./start (from terminal). If you get permission error, just do chmod 777 start
```
