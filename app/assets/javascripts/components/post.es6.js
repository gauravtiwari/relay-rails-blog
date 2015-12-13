var React = require('react');
var Relay = require('react-relay');
class Post extends React.Component {
  constructor() {
   super();
   this._handleLike = this._handleLike.bind(this);
  }

  render() {
    var {post} = this.props;
    return (
       <article>
         <div className='container'>
           <div className='row'>
             <div className='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>
               <h2 className='section-heading'>{ post.title }</h2>
               { post.body }
               <div className="post-preview show">
                 <div className="post-meta">
                   <span>
                     Posted by: <a href="#">{ post.user.name }</a>
                     { LocalTime.relativeTimeAgo(new Date(post.created_at)) }
                   </span>
                   <span className="counters">
                     Comments: { post.comments_count }
                   </span>
                   <div>
                      {this.props.post.viewerDoesLike
                        ? 'You like this'
                        : <button onClick={this._handleLike}>Like this</button>
                      }
                    </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </article>
    );
  }
}
module.exports = Post;

var PostContainer = Relay.createContainer(Post, {
    initialVariables: {
      count: 1000
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
            viewerDoesLike,
            votes_count,
            user {
              name
            },
            comments(first: $count, order: "-id") {
              edges {
                node {
                  id,
                  body,
                  votes_count,
                  user {
                    id,
                    name
                  }
                }
              },
            }
          }
        `
    }
});

module.exports = PostContainer;
