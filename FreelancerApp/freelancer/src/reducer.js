import axios from 'axios';

const initialState={
    login: false,
    user_info: null,
    projects:[],
    bids:[]
}

function reducerApp(state, action){
    if (typeof state === "undefined") {
        return initialState;
    }
    
    switch(action.type){
        case "SetUser":
            sessionStorage.setItem('User',action.payload.username);
            sessionStorage.setItem('Email',action.payload.email);
            return Object.assign({},{login: true, user_info:action.payload});
        case "SignOut":
            sessionStorage.removeItem('User');
            sessionStorage.removeItem('Email');
            return Object.assign({},state,initialState);
        case "SetProject":
            return Object.assign({},{login: true, projects:action.payload});
        case "SetBid":
            return Object.assign({},{login: true, bids:action.payload});
        default:
            return state;
    }
}

export default reducerApp;