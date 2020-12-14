import {
    SET_TWEETS, 
    LOADING_DATA, 
    POST_TWEET,
    LIKE_TWEET, 
    UNLIKE_TWEET, 
    SET_ERRORS,
    DELETE_TWEET,
    LOADING_UI,
    CLEAR_ERRORS} from '../types';
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

//Post tweet
export const postTweet = newTweet => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post(`${URL}/create-tweet`, newTweet)
        .then(res => {
            dispatch({
                type: POST_TWEET,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
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

export const deleteTweet = tweetId => dispatch => {
    axios
        .delete(`${URL}/tweet/${tweetId}`)
        .then(() => {
            dispatch({type: DELETE_TWEET, payload: tweetId});
        })
        .catch(err => console.log(err));
}