import React from 'react';
import Relay from 'react-relay';
import classNames from 'classNames';
import PostPreview from './PostPreview';

/*
  Component: Posts
  Renders a collection of posts
*/

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this._handleScrollLoad = this._handleScrollLoad.bind(this);
    this._loadFilter = this._loadFilter.bind(this);
    this.state = { loading: false, done: false, popular: false }
  }

  componentDidMount() {
    this._handleScrollLoad();
  }

  render() {
    const classes = classNames({
      'filter': true,
      'active': this.state.popular,
    });

    const { root } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div className="posts-filters">
              <ul className="filters">
                <li className={classes}>
                  <a onClick={this._loadFilter.bind(this, "popular", null)}>
                    Popular posts
                  </a>
                </li>
                <li>
                  <a onClick={this._loadFilter.bind(this, null, "-id")}>Reset</a>
                </li>
              </ul>
            </div>
            {root.posts.edges.map(({ node }) => (
              <PostPreview key={node.id} post={node} root={root} />
            ))}
          </div>
        </div>
        {this.state.loading ? <div className="loadmore">
          <span className="fa fa-spin fa-spinner"></span>
        </div> : ''}
        {this.state.done ? <div className="loadmore-done">
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
                loading: false,
              })
            }
          });
        } else {
          if (!this.state.done) {
            this.setState({
              done: true,
            });
          }
        }
      }
    }.bind(this));
  }

  _loadFilter(filter, order) {
    this.setState({
      popular: !this.state.popular,
    });
    this.props.relay.setVariables({
      filter: filter,
      order: order,
    });
  }
}

module.exports = Posts;

/*
  Relay Container: Posts
  Defines data need for this component
*/

const PostsContainer = Relay.createContainer(Posts, {
  initialVariables: {
    count: 20,
    order: '-id',
    filter: null,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        posts(first: $count, order: $order, filter: $filter) {
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
    `,
  },
});

module.exports = PostsContainer;
