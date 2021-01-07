import {
    SET_TWEETS, 
    LOADING_DATA, 
    POST_TWEET,
    LIKE_TWEET, 
    UNLIKE_TWEET, 
    SET_ERRORS,
    DELETE_TWEET,
    LOADING_UI,
    STOP_LOADING_UI,
    CLEAR_ERRORS,
    SUBMIT_COMMENT,
    SET_TWEET
} from '../types';
import axios from 'axios';
import {URL} from '../../util/constants';
axios.defaults.baseURL = "https://europe-west1-twitterapp-93e1d.cloudfunctions.net/api"

//Gettings tweets
export const getTweets = () => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get(`/tweets`)
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

export const getTweet = tweetId => dispatch => {
    dispatch({type: LOADING_UI});
    axios.get(`/tweet/${tweetId}`)
        .then(res => {
            dispatch({
                type: SET_TWEET,
                payload: res.data
            });
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => console.log(err))
}

//Post tweet
export const postTweet = newTweet => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post(`/create-tweet`, newTweet)
        .then(res => {
            dispatch({
                type: POST_TWEET,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Submit comment 
export const submitComment = (tweetId, commentData) => dispatch => {
    axios.post(`/tweet/${tweetId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors())
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
    axios.get(`/tweet/${tweetId}/like`)
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
    axios.get(`/tweet/${tweetId}/unlike`)
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
        .delete(`/tweet/${tweetId}`)
        .then(() => {
            dispatch({type: DELETE_TWEET, payload: tweetId});
        })
        .catch(err => console.log(err));
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}

//user Data
export const getUserData = handle => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get(`/user/${handle}`)
        .then(res => {
            dispatch({
                type: SET_TWEETS,
                payload: res.data.tweets
            });
        })
        .catch(err => {
            dispatch({
                type: SET_TWEETS,
                payload: null
            });
        })

}