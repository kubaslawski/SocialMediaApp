import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
//Components
import Navbar from './components/Navbar';

class App extends Component{
  render() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
        </Switch>
        </div>
      </Router>
    </div>
  );
  }
}

export default App;
