var React = require('react');
var Relay = require('react-relay');
var PostPreview = require('./post_preview.es6.js');

class Posts extends React.Component {
  render() {
    const {root} = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              {root.posts.edges.map(({node}) => (
                <PostPreview key={node.id} post={node} root={root} />
              ))}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
module.exports = Posts;

var PostsContainer = Relay.createContainer(Posts, {
    initialVariables: {
      count: 10,
      order: "-id"
    },
    fragments: {
        root: () => Relay.QL`
            fragment on Viewer {
                id,
                posts(first: $count, order: $order) {
                    edges {
                        node {
                            id,
                            ${PostPreview.getFragment('post')}
                        }
                    }
                }
            }
        `
    }
});

module.exports = PostsContainer;

