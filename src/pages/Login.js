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



class Login extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`${URL}/login`, userData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loading: false
                });
                this.props.history.push('/')
            })
            .catch(err => {
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
                        Login
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
                        helperText={errors.general}
                        error={errors.general ? true : false}
                        fullWidth/>
                        <TextField 
                        id='password' 
                        name='password' 
                        type='password'
                        label='Password'
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
