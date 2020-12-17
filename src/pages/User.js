import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tweet from '../components/Tweet';
import Grid from '@material-ui/core/Grid';
import {URL} from '../api/constants';
import StaticProfile from '../components/StaticProfile';
import ProfileSkeleton from '../components/ProfileSkeleton';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

export class User extends Component {
    state = {
        profile: {},
        tweetIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const tweetId = this.props.match.params.tweetId;
        if(tweetId) this.setState({tweetIdParam: tweetId});
        this.props.getUserData(handle);
        axios.get(`${URL}/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        
        const {tweets, loading} = this.props.data;
        const {tweetIdParam} = this.state;

        const tweetsMarkup = loading ? (
            <Tweet/>
        ) : tweets === null ? (
            <p>No tweets from this user</p>
        ) : !tweetIdParam ? (
            tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}/>)
        ) : (
            tweets.map(tweet => {
                if(tweet.tweetId !== tweetIdParam)
                return <Tweet key={tweet.tweetId} tweet={tweet}/>
                else return <Tweet key={tweet.tweetId} tweet={tweet} openDialog/>
            })
        )
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {tweetsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (
                    <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(User);