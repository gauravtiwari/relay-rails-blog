var React = require('react');
var Relay = require('react-relay');
var PostPreview = require('./post_preview.es6.js');

/*
  Component: Posts
  Renders a collection of posts
*/

class Posts extends React.Component {
  constructor(props) {
   super(props);
   this._handleScrollLoad = this._handleScrollLoad.bind(this);
   this.state = {loading: false, done: false}
  }

  componentDidMount() {
    this._handleScrollLoad();
  }

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
        {this.state.loading ?  <div className="loadmore">
            <span className="fa fa-spin fa-spinner"></span>
          </div> : ''}
        {this.state.done ?  <div className="loadmore-done">
            <p>No more posts to load</p>
          </div> : ''}
      </div>
    );
  }

  _handleScrollLoad() {
    $(window).scroll(function() {
      if (App.scrolledToBottom() && !this.state.loading) {
        if(this.props.root.posts.pageInfo.hasNextPage) {
          this.setState({
            loading: true
          });
          this.props.relay.setVariables({
            count: this.props.relay.variables.count + 20
          }, readyState => {
            if (readyState.done) {
              this.setState({
                loading: false
              })
            }
          });
        } else {
          if(!this.state.done) {
            this.setState({
              done: true
            });
          }
        }
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
      count: 20,
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
            pageInfo {
              hasNextPage
            }
          }
        }
      `
    }
});

module.exports = PostsContainer;

