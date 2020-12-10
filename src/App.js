import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
  } else {
    authenticated = true;
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
          authenticated={authenticated}
          />
          <AuthRoute
          exact
          path="/signup"
          component={SignUp}
          authenticated={authenticated}
          />
        </Switch>
        </div>
      </Router>
      </Provider>
    </MuiThemeProvider>
  );
  }
}

export default App;
