import React, { Component } from 'react';
import './App.css';
import {Route,withRouter} from 'react-router-dom';
import Questions from './components/Questions';
import Question from './components/Question';
import Navbar from './components/Navbar';
import CallBack from './components/Callback';
import NewQuestion from './components/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import auth0Client from './Auth';




class App extends Component {

  constructor(props){
    super(props);

    this.state={
      checkingSession:true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback'){
      this.setState({checkingSession:false});
      return;
    } 
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/callback' component={CallBack}/>
        <SecuredRoute path='/newQuestion' component={NewQuestion} checkingSession={this.state.checkingSession}/>
      </div>
    );
  }
}

export default withRouter(App);
