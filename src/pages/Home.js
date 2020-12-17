import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
//Components
import Tweet from "../components/tweet/Tweet";
import Profile from "../components/profile/Profile";
import TweetSkeleton from '../util/TweetSkeleton';
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
        ) : (
        <TweetSkeleton/>
        )
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
