var React = require('react');
var Relay = require('react-relay');
var Comment = require('./comment.es6.js');

/*
  Component: Post
  Renders single post with author and comments
*/

class Post extends React.Component {

  constructor(props) {
   super(props);
   this._handleScrollLoad = this._handleScrollLoad.bind(this);
   this.state = { loading: false, done: false }
  }

  componentDidMount() {
    this._handleScrollLoad();
  }

  render() {
    var {post} = this.props;
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
                     Votes: { post.votes_count }
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
