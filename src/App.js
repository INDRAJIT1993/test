import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/bootstrap.css'
import './css/style.css'
import login from './components/login'
import BrowseList  from './components/dashboard'; 
import userProfile from "./components/profile";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ToastContainer />
          <Route exact path="/" component={login} />
          <Route exact path="/Users" component={BrowseList} />
          <Route exact path="/users/:id" component={userProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
