import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "./MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {URL} from '../api/constants';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI STUFF
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { connect } from "react-redux";
import { getTweet, clearErrors } from "../redux/actions/dataActions";

const styles = (theme) => ({
    paper: {
      padding: 20,
      margin: '0 0 0 20px'
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
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      marginBottom: 20
    },
    commentData: {
      marginLeft: 20
    }
  });

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount(){
    if(this.props.openDialog){
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const {user, tweetId} = this.props;
    const newPath = `/users/${user}/tweet/${tweetId}`;

    if(oldPath === newPath) oldPath = `/users/${user}`;

    window.history.pushState(null, null, newPath);


    this.setState({ open: true, oldPath, newPath });
    this.props.getTweet(this.props.tweetId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      tweet: {
        tweetId,
        content,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        user,
        comments
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2}/>
        </div>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`${URL}/users/${user}`}>
                        @{user}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {content}
                    </Typography>
                    <LikeButton tweetId={tweetId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
            </Grid>
            <hr className={classes.invisibleSeparator}/>
            <CommentForm tweetId={tweetId}/>
            <Comments comments={comments}/>
        </Grid>
    )

    return (
        <Fragment>
            <MyButton onClick={this.handleOpen} tip="Expand tweet" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog  open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
  }

}

PostDialog.propTypes = {
  getTweet: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  tweet: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  tweet: state.data.tweet,
  UI: state.UI,
});

const mapDispatchToProps = {
  getTweet,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostDialog));
