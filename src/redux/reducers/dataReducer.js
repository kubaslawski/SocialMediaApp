const initialState = {
    authenticated: false, 
    credentials: {},
    likes: [],
    notifications: []
};


export default function(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}