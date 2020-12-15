import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from './MyButton';
import DeleteTweet from './DeleteTweet';
import TweetDialog from './TweetDialog';
import LikeButton from './LikeButton';
//MUI Stuff
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import {connect} from 'react-redux';
import { Favorite } from '@material-ui/icons';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Tweet extends Component {


    render() { 

        dayjs.extend(relativeTime)
        const {classes, tweet: { 
            content, 
            createdAt, 
            userImage, 
            user, 
            tweetId, 
            likeCount, 
            commentCount},
            user: {
                authenticated,
                credentials: {
                    handle
                }
            }
        } = this.props



        const deleteButton = authenticated && handle === user ? (
            <DeleteTweet tweetId={tweetId}/>
        ) : null


        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile image"
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${user}`}>
                        {user}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {content}
                    </Typography>
                    <LikeButton tweetId={tweetId}/>
                    <span>{likeCount} Likes here</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <TweetDialog tweetId={tweetId} user={user}/>
                </CardContent>
            </Card>
        )
    }
}

Tweet.propTypes = {
    user: PropTypes.object.isRequired,
    tweet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Tweet))
