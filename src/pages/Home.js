import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
//URL
import {URL} from "../api/constants";
//Components
import Tweet from "../components/Tweet";

class Home extends Component {
    state = {
        tweets: null
    }
    componentDidMount(){
        axios.get(`${URL}/tweets`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    tweets: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentTweetMarkup = this.state.tweets ? (
        this.state.tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}></Tweet>)
        ) : <p>Loading...</p>
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentTweetMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home
