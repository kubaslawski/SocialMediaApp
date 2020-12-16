import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tweet from '../components/Tweet';
import Grid from '@material-ui/core/Grid';
import {URL} from '../api/constants';
import StaticProfile from '../components/StaticProfile';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

export class User extends Component {
    state = {
        profile: {}
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
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

        const tweetsMarkup = loading ? (
            <p>loading data...</p>
        ) : tweets === null ? (
            <p>No tweets from this user</p>
        ) : (
            tweets.map(tweet => <Tweet key={tweet.tweetId} tweet={tweet}/>)
        )
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {tweetsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <StaticProfile profile={this.state.profile}/>
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