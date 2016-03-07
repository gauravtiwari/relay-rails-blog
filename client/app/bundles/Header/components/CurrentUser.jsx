/*
  Component: CurrentUser
*/

/* global Routes */

import React from 'react';
import Relay from 'react-relay';

class CurrentUser extends React.Component {
  render() {
    const { user } = this.props;
    return (
    <nav className="navbar navbar-default navbar-custom">
      <div className="container-fluid">
        <div className="navbar-header page-scroll">
          <a className="navbar-brand" href="/">Demo Blog</a>
        </div>
        <div className="collapse navbar-collapse">
          {user.current_user !== null ?
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href={Routes.root_path()}>Home</a>
            </li>
            <li>
              <a href='/editor'>Editor</a>
            </li>
            <li>
              <a href="#">
                {user.current_user.name}
              </a>
            </li>
            <li>
              <a href={Routes.destroy_user_session_path()} data-method="delete">
                Logout
              </a>
            </li>
            <li>
              <a href='https://github.com/gauravtiwari/relay-rails-blog'>
              <span className="fa fa-github"></span> Code
              </a>
            </li>
          </ul> :
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href={Routes.root_path()}>Home</a>
            </li>
            <li>
              <a href='/editor'>Editor</a>
            </li>
            <li>
              <a href={Routes.new_user_registration_path()}>Signup</a>
            </li>
            <li>
              <a href={Routes.new_user_session_path()}>Login</a>
            </li>
            <li>
              <a href='https://github.com/gauravtiwari/relay-rails-blog'>
              <span className="fa fa-github"></span> Code
              </a>
            </li>
          </ul>}
        </div>
      </div>
    </nav>
    );
  }
}

module.exports = CurrentUser;

/*
  Relay Container: CurrentUser
*/

const CurrentUserContainer = Relay.createContainer(CurrentUser, {
  fragments: {
    user: () => Relay.QL`
      fragment on Viewer {
        current_user {
          name
        }
      }
    `,
  },
});

module.exports = CurrentUserContainer;
