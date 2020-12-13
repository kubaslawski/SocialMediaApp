import {SET_TWEETS, LOADING_DATA, LIKE_TWEET, UNLIKE_TWEET, SET_ERRORS} from '../types';
import axios from 'axios';
import {URL} from '../../api/constants';

//Gettings tweets
export const getTweets = () => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get(`${URL}/tweets`)
        .then(res => {
            dispatch({
                type: SET_TWEETS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_TWEETS,
                payload: []
            })
        })
}

//Like tweet 
export const likeTweet = tweetId => dispatch => {
    axios.get(`${URL}/tweet/${tweetId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_TWEET,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


//Unlike tweet
export const unlikeTweet = tweetId => dispatch => {
    axios.get(`${URL}/tweet/${tweetId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_TWEET,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}