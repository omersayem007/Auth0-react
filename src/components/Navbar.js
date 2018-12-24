import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';



class Navbar extends Component {

    signOut =(props) => {

        auth0Client.signOut();
        this.props.history.replace('/');     
    }


  render() {
    return (
      <div>
          {
              !auth0Client.isAuthenticated() &&
              <button onClick={auth0Client.signIn}>SignIn</button>
          }
          {
              auth0Client.isAuthenticated() &&
              <div>
                <label>{auth0Client.getProfile.name}</label>
                <button onClick={this.signOut}>SignOut</button>
              </div>
          } 
      </div>
    );
  }
}

export default withRouter(Navbar);