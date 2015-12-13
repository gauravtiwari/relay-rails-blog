### WIP: Blog application powered by Rails, react, graphql and Relay.

This blog is an exploration excerise to understand two new technologies - GraphQL and Relay. It's a work in progress and this repository will update as we move further with this application.

### Status

The application currently supports only fetching data from server. No implementations has been made in regards to data updates.

### Running locally
To run the application, please just clone the repo and run it like so:

```
git clone git@github.com:gauravtiwari/relay-rails-blog.git
cd relay-rails-blog
npm install
./start (from terminal). If you get permission error, just do chmod 777 start
```
### Demo Links
* [Demo blog](https://relay-rails-blog.herokuapp.com/)
* [GraphiQL query editor](https://relay-rails-blog.herokuapp.com/editor)


### TODOs

* Add relay mutations to edit/update/destroy data state
* Add user session management and authorization
* Explore Relay subscriptions to hook it with ActionCable [http://graphql.org/blog/subscriptions-in-graphql-and-relay/](http://graphql.org/blog/subscriptions-in-graphql-and-relay/)
* Add a react native app
* Probably more...
