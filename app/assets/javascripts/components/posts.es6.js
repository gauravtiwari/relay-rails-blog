var React = require('react');
var Relay = require('react-relay');
var PostPreview = require('./post_preview.es6.js');

/*
  Component: Posts
  Renders a collection of posts
*/

class Posts extends React.Component {

  componentDidMount() {
    this._handleScrollLoad();
  }

  render() {
    const {root} = this.props;
    console.log(root)
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              {root.posts.edges.map(({node}) => (
                <PostPreview key={node.id} post={node} root={root} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  _handleScrollLoad() {
    const {root} = this.props;
    $(window).scroll(function() {
      if ($(window).scrollTop() === $(document).height() - $(window).height()) {
        console.log(root);
        root.relay.setVariables({
          after: root.posts.edges.slice(-1).pop().cursor
        });
      }
    }.bind(this));
  }
}

module.exports = Posts;

/*
  Relay Container: Posts
  Defines data need for this component
*/

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
              cursor,
              node {
                id,
                ${PostPreview.getFragment('post')}
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
          }
        }
      `
    }
});

module.exports = PostsContainer;

