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
        case "SignIn":
            let user;
            axios.post('/getuser', action.payload).then(
            (res)=>{
                user = res.data;
                if (user.password==action.payload.password) {
                    console.log("login successful");
                    return Object.assign({},state,{user_info:user, login: true});
                } else {
                    console.log("login failure");
                    return Object.assign({},state,initialState);
                }
            }
            );
        case "SignOut":
            sessionStorage.removeItem('User');
            return Object.assign({},state,initialState);
        case "GetUser":
            axios.post('/getuser', 
                action.payload
            ).then(
            (res)=>{
                return Object.assign({},state,{user_info:res.data});
            }
            );
        default:
            return state;
    }
}

export default reducerApp;