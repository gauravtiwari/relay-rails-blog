import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames/bind';
import Moment from 'moment';
// Import components
import Comment from '../../Comments/components/Comment';
import CreateComment from '../../Mutations/CreateComment';
import VoteMutations from '../../Mutations/VoteMutations';
import showdown from 'showdown';

const converter = new showdown.Converter();

/* global Routes, App */

/*
  Component: Post
  Renders single post with author and comments
*/

class Post extends React.Component {
  constructor(props) {
    super(props);
    this._handleScrollLoad = this._handleScrollLoad.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
    this._handleVote = this._handleVote.bind(this);
    this.state = { loading: false, done: false };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScrollLoad);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScrollLoad);
  }

  render() {
    const { post } = this.props;
    const voted = classNames({
      'fa fa-thumbs-up voted': this.props.post.voted,
      'fa fa-thumbs-o-up': !this.props.post.voted,
    });

    return (
       <article>
         <div className="container">
           <div className="row">
             <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <h2 className="section-heading">
                {post.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(post.body) }}
              />
              <div className="post-preview show">
                <div className="post-meta">
                  <span className="counters">
                    <a onClick={this._handleVote}>
                      <span className={voted}></span>
                    </a>
                     {post.votes_count}
                   </span>
                   <span className="author">
                     Posted by: <em>{post.user.name}</em>
                   </span>
                   <span className="date">
                    {Moment(Moment.utc(post.created_at).toDate()).fromNow().toString()}
                   </span>
                   <span className="counters">
                     Comments: {post.comments_count}
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="comments-container">
          <div className="container">
           <div className="row">
             <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <h1> Comments </h1>
              <textarea ref="comments_form" className="add-comment"
                onKeyDown={this._handleCreate}
              />
              {post.comments.edges.map(({ node }) => (
                <Comment key={node.id} comment={node} post={post} />
              ))}
             </div>
             </div>
           </div>
           {this.state.loading ? <div className="loadmore">
               <span className="fa fa-spin fa-spinner"></span>
             </div> : ''}
           {this.state.done ? <div className="loadmore-done">
               <p>No more comments to load</p>
             </div> : ''}
         </div>

       </article>
    );
  }

  _handleVote(event) {
    if (App.loggedIn()) {
      Relay.Store.commitUpdate(new VoteMutations({
        type: 'Post',
        votable: this.props.post,
      }));
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

  _handleCreate(event) {
    if (App.loggedIn()) {
      if (event.keyCode === 13) {
        Relay.Store.commitUpdate(
          new CreateComment({
            post: this.props.post,
            body: event.target.value,
          }));
        this.refs.comments_form.value = '';
      }
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

  _handleScrollLoad() {
    if (App.scrolledToBottom() && !this.state.loading) {
      if (this.props.post.comments.pageInfo.hasNextPage) {
        this.setState({
          loading: true,
        });
        this.props.relay.setVariables({
          count: this.props.relay.variables.count + 20,
        }, readyState => {
          if (readyState.done) {
            this.setState({
              loading: false,
            });
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
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired,
};

module.exports = Post;

/*
  Relay Container: Post
  Defines data need for this post
*/

const PostContainer = Relay.createContainer(Post, {
  initialVariables: {
    count: 20,
    order: '-id',
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        slug,
        body,
        voted,
        created_at,
        comments_count,
        votes_count,
        user {
          name
        },
        comments(first: $count, order: "-id") {
          edges {
            node {
              id,
              votes_count,
              voted,
              ${Comment.getFragment('comment')}
            }
          },
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
});

module.exports = PostContainer;
