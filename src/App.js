import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import themeObject from './util/theme';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
//Components
import Navbar from './components//layout/Navbar';
import AuthRoute from './util/AuthRoute'
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href ='/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component{
  render() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute
          exact path="/login"
          component={Login}
          />
          <AuthRoute
          exact
          path="/signup"
          component={SignUp}
          />
          <Route exact path="/users/:handle" component={User}/>
          <Route exact path="/users/:handle/tweet/:tweetId" component={User}/>
        </Switch>
        </div>
      </Router>
      </Provider>
    </MuiThemeProvider>
  );
  }
}

export default App;
