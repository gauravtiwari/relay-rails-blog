var React = require('react');
var Relay = require('react-relay');

class Posts extends React.Component {
  render() {
    console.log(this.props.posts);
    return (
      <div>
        Boarding... {_name}
      </div>
    );
  }
}
module.exports = Posts;

var PostsContainer = Relay.createContainer(Posts, {
  fragments: {
    posts: () => Relay.QL`
      fragment on posts {
        id,
        title
      }
    `,
  },
});

module.exports = PostsContainer;
