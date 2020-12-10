import {SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNATHENTICATED,
    LOADING_USER,
    LOADING_UI
} from '../types';

const initialState = {
    authenticated: false, 
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,                
            };
        case SET_UNATHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}