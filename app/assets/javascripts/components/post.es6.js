var React = require('react');
var Relay = require('react-relay');
var Comment = require('./comment.es6.js');
var classNames = require('classnames');
import CreateCommentMutation from '../mutations/comment/create_comment_mutation.es6.js';
import PostVoteMutation from '../mutations/vote/post_vote_mutation.es6.js';
import PostUnVoteMutation from '../mutations/vote/post_unvote_mutation.es6.js';
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
   this.state = { loading: false, done: false }
  }

  componentDidMount() {
    this._handleScrollLoad();
  }

  render() {
    var {post} = this.props;

    var voted = classNames({
      'fa fa-thumbs-up voted': this.props.post.voted,
      'fa fa-thumbs-o-up': !this.props.post.voted
    });

    return (
       <article>
         <div className='container'>
           <div className='row'>
             <div className='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>
               <h2 className='section-heading'>
                { post.title }
                </h2>
                <div dangerouslySetInnerHTML={{__html: post.body }} />
               <div className="post-preview show">
                 <div className="post-meta">
                   <span className="author">
                     Posted by: <em>{ post.user.name }</em>
                   </span>
                   <span className="date">
                    { LocalTime.relativeTimeAgo(new Date(post.created_at)) }
                   </span>
                   <span className="counters">
                     Comments: { post.comments_count }
                   </span>
                   <span className="counters">
                    <a onClick={this._handleVote}>
                      <span className={voted}></span>
                    </a>
                     { post.votes_count }
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <div className="comments-container">
          <div className='container'>
           <div className='row'>
             <div className='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>
              <h1> Comments </h1>
              <textarea className="add-comment" onKeyDown={this._handleCreate} />
              {post.comments.edges.map(({node}) => (
                <Comment key={node.id} comment={node} root={post} />
              ))}
             </div>
             </div>
           </div>
           {this.state.loading ?  <div className="loadmore">
               <span className="fa fa-spin fa-spinner"></span>
             </div> : ''}
           {this.state.done ?  <div className="loadmore-done">
               <p>No more comments to load</p>
             </div> : ''}
         </div>

       </article>
    );
  }

  _handleVote(event) {
    if(App.loggedIn()) {
      if(this.props.post.voted) {
        Relay.Store.update(new PostUnVoteMutation({post: this.props.post}))
      } else {
        Relay.Store.update(new PostVoteMutation({post: this.props.post}))
      }
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

  _handleCreate(event) {
    if(App.loggedIn()) {
      if(event.keyCode === 13 && event.target.value.length > 10) {
        Relay.Store.update(new CreateCommentMutation({post: this.props.post, body: event.target.value}))
        $('.add-comment').val('');
      }
    } else {
      window.location.href = Routes.new_user_session_path();
    }
  }

  _handleScrollLoad() {
    $(window).scroll(function() {
      if (App.scrolledToBottom() && !this.state.loading) {
        if(this.props.post.comments.pageInfo.hasNextPage) {
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

module.exports = Post;

/*
  Relay Container: Post
  Defines data need for this post
*/

var PostContainer = Relay.createContainer(Post, {
    initialVariables: {
      count: 20
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
                  ${Comment.getFragment('comment')}
                }
              },
              pageInfo {
                hasNextPage
              }
            }
          }
        `
    }
});

module.exports = PostContainer;
