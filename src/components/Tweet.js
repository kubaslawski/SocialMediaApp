import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
//MUI Stuff
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//URL
import {URL} from "../api/constants";


const styles = {
    card: {
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
        const {classes, tweet: { 
            content, 
            createdAt, 
            userImage, 
            user, 
            tweetId, 
            likeCount, 
            commentCount}
        } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile image"
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${user}`}>{user}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography variant="body1">{content}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Tweet);
