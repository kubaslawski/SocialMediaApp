import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {URL} from '../util/constants';
//components
import StaticProfile from '../components/profile/StaticProfile';
import ProfileSkeleton from '../util/ProfileSkeleton';
import TweetSkeleton from '../util/TweetSkeleton';
import Tweet from '../components/tweet/Tweet';
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

const styles = (theme) => ({
    paper: {
      padding: 20,
      margin: '0 20px 20px 20px'
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
    }
  });



class User extends Component {
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
        console.log(this.props)
        const {tweets, loading} = this.props.data;
        const {tweetIdParam} = this.state;

        const tweetsMarkup = loading ? (
            <TweetSkeleton/>
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