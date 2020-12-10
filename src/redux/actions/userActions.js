import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNATHENTICATED, LOADING_USER} from '../types';
import {URL} from '../../api/constants';
import axios from 'axios';


export const loginUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post(`${URL}/login`, userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
            })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER})
    axios.get(`${URL}/user`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const uploadImage = formData => dispatch => {
    dispatch({type: LOADING_USER});
    axios.post(`${URL}/user/image`, formData)
        .then(res => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}

export const signUpUser = (newUserData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post(`${URL}/signup`, newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/')
            })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: SET_UNATHENTICATED});
}

export const editUserDetails = userDetails => dispatch => {
    dispatch({type: LOADING_USER})
    axios.post(`${URL}/user`, userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}