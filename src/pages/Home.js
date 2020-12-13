import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
//URL
import {URL} from "../api/constants";
//Components
import Tweet from "../components/Tweet";
import Profile from "../components/Profile";
//REDUX
import {connect} from 'react-redux';
import {getTweets} from '../redux/actions/dataActions';

class Home extends Component {
    state = {
        tweets: null
    }
    componentDidMount(){
        this.props.getTweets();
    }
    render() {
        const {tweets, loading} = this.props.data;
        let recentTweetMarkup = !loading ? (
        tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}></Tweet>)
        ) : <p>Loading...</p>
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentTweetMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getTweets: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getTweets})(Home);
