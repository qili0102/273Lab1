const initialState={
    login: false,
    username: null,
    password: null
}

function reducerApp(state, action){
    if (typeof state === "undefined") {
        return initialState;
    }

    switch(action.type){
        case "SignIn":
            // alert("In");
            return Object.assign({},state,action.payload);
        case "SignOut":
            // alert("Out");
            sessionStorage.removeItem('User');
            return Object.assign({},state,initialState);
        default:
            return state;
    }
}

export default reducerApp;