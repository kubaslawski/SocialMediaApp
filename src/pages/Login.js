import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
//MUI STUFF
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX STUFF
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.themeToSpread
  });



class Login extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={logo} alt="twitter logo img" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id='email' 
                        name='email' 
                        type='email'
                        label='Email'
                        autoComplete="off"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        helperText={errors.general}
                        error={errors.general ? true : false}
                        fullWidth/>
                        <TextField 
                        id='password' 
                        name='password' 
                        type='password'
                        label='Password'
                        autoComplete="off"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange}
                        helperText={errors.general}
                        error={errors.general ? true : false}
                        fullWidth/>
                        <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Don't have an account? Sign up <Link to="/signup">Here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
