import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import PostPreview from './PostPreview';

/* global App, Routes */

/*
  Component: Posts
  Renders a collection of posts
*/

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this._handleScrollLoad = this._handleScrollLoad.bind(this);
    this._loadFilter = this._loadFilter.bind(this);
    this._loadTaggedPosts = this._loadTaggedPosts.bind(this);
    this.state = {
      loading: false,
      done: false,
      popular: false,
    };
  }

  componentWillMount() {
    if (this.props.relay.route.params && this.props.relay.route.params.id) {
      this._loadTaggedPosts();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScrollLoad);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScrollLoad);
  }

  render() {
    const { root } = this.props;
    const classes = classNames({
      'filter': true,
      'active': this.state.popular,
    });
    const tags = root.tags.map((tag) => {
      return (<li key={Math.random()} className={
                  window.location.pathname === Routes.tag_path(tag) ?
                  'tag active' : 'tag'}>
                <a href={Routes.tag_path(tag)}>
                  {tag}
                </a>
              </li>
            );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-7">
            {root.posts.edges.map(({ node }) => (
              <PostPreview key={node.id} post={node} root={root} />
            ))}
          </div>
          <div className="col-lg-5 col-md-5">
            <div className="posts-filters">
              <h3>Post categories</h3>
              <ul className="filters">
                <li className={classes}>
                  <a onClick={this._loadFilter.bind(this, "popular", null)}>
                    Popular posts
                  </a>
                </li>
                <li>
                  <a href={Routes.root_path()}>Reset</a>
                </li>
                {tags}
              </ul>
            </div>
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
  }

  _loadTaggedPosts() {
    this.props.relay.setVariables({
      tag: this.props.relay.route.params.id,
    });
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
    tag: null,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        tags,
        posts(first: $count, order: $order, filter: $filter, tag: $tag) {
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
