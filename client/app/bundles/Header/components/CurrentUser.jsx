/*
  Component: CurrentUser
*/

/* global Routes */

import React from 'react';
import Relay from 'react-relay';

const CurrentUser = function CurrentUser(props) {
  const { root } = props;
  return (
  <nav className="navbar navbar-default navbar-custom">
    <div className="container-fluid">
      <div className="navbar-header page-scroll">
        <a className="navbar-brand" href="/">Demo Blog</a>
      </div>
      <div className="collapse navbar-collapse">
        {root.current_user !== null ?
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href={Routes.root_path()}>Home</a>
          </li>
          <li>
            <a href="#">{root.current_user.name}</a>
          </li>
          <li>
            <a href={Routes.destroy_user_session_path()}
              data-turbolinks="false" data-method="delete"
            >Logout
            </a>
          </li>
          <li>
            <a href="https://github.com/gauravtiwari/relay-rails-blog" target="_blank" data-turbolinks="false">
              <span className="fa fa-github"></span> Code
            </a>
          </li>
        </ul> :
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href={Routes.root_path()}>Home</a>
          </li>
          <li>
            <a href={Routes.new_user_registration_path()}>Signup</a>
          </li>
          <li>
            <a href={Routes.new_user_session_path()}>Login</a>
          </li>
          <li>
            <a href="https://github.com/gauravtiwari/relay-rails-blog" target="_blank" data-turbolinks="false">
            <span className="fa fa-github"></span> Code
            </a>
          </li>
        </ul>}
      </div>
    </div>
  </nav>
  );
};

CurrentUser.propTypes = {
  root: React.PropTypes.object.isRequired,
};

module.exports = CurrentUser;

/*
  Relay Container: CurrentUser
*/

const CurrentUserContainer = Relay.createContainer(CurrentUser, {
  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        current_user {
          name,
          is_moderator,
        }
      }
    `,
  },
});

module.exports = CurrentUserContainer;
