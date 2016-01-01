### WIP: Part 1 blog application

This blog is an exploration excerise to understand two new technologies - GraphQL and Relay. We are using standard rails application together with npm for handling front-end dependencies.

It's a work in progress and this repository will update as we move further with this application. The intention is to explore the integration to stage where we can get a clear understanding about these two new technologies and how they might fit in a real world application and framework.

### Running/Developing locally
To run the application, please just clone the repo and run it like so:

```
git clone -b blog/part1 git@github.com:gauravtiwari/relay-rails-blog.git blog
cd blog
npm install
bundle install
rake db:create db:migrate db:seed
./start (from terminal). If you get permission error, just do chmod 777 start
```

#### In part 1: Status
* Models, Controllers and Views
* Styles and helper scripts
* GraphQL types
* Schema generation

### Further Resources

* [Facebook Relay](https://facebook.github.io/relay/): Official relay docs
* [GraphQL](http://facebook.github.io/graphql/): Official GraphQL spec
* [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) & [graphql-relay-ruby](https://github.com/rmosolgo/graphql-relay-ruby): For defining GraphQL schema and Relay implementation in Ruby GraphQL classes, and getting Rails to speak GraphQL.
* ```browserify-rails```: Command-line options required to do transpilation, e.g., —plugin, etc.

