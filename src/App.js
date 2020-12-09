import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
//Components
import Navbar from './components/Navbar';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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

class App extends Component{
  render() {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
  }
}

export default App;
