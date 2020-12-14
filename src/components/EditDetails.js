import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from './MyButton';
//REDUX
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';
//MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    paper: {
      padding: 20,
      margin: '0 0 0 20px',
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    },
    button: {
        float: 'right',
    }
  });

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ?  credentials.bio : '',
            website: credentials.website ?  credentials.website : '',
            location: credentials.location ?  credentials.location : '',
        });
    }

    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials);
    }
    
    handleClose = () => {
        this.setState({open: false})
    }

    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }



    render() {
        const {classes} = this.props;
        return (
            <div>
                <Fragment>
                    <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                        <EditIcon color="primary"/>
                    </MyButton>
                    <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Edit your details
                        </DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                placeholder="A short bio about urself"
                                multiline
                                rows="3"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                                />
                                <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your personal/professional website"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                                />
                                <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where you live"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            </div>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))