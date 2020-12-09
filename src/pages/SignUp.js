import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
//MUI STUFF
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//URL
import {URL} from '../api/constants';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto',
        width: '200px'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    }
}



class SignUp extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios
            .post(`${URL}/signup`, newUserData)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
            
    }
    
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={logo} alt="twitter logo img" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id='email' 
                        name='email' 
                        type='email'
                        label='Email'
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        fullWidth/>
                        <TextField 
                        id='password' 
                        name='password' 
                        type='password'
                        label='Password'
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        fullWidth/>
                        <TextField 
                        id='confirmPassword' 
                        name='confirmPassword' 
                        type='password'
                        label='Confirm Password'
                        className={classes.textField}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        fullWidth/>
                        <TextField 
                        id='handle' 
                        name='handle' 
                        type='text'
                        label='Handle'
                        className={classes.textField}
                        value={this.state.handle}
                        onChange={this.handleChange}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        fullWidth/>
                        <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}>
                            SignUp
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Already have an account? Login <Link to="/login">Here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp);
