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
            alert("In");
            return Object.assign({},state,{login:true});
        case "SignUp":
            alert("Up");
            return Object.assign({},state,{login:false});
        default:
            return state;
    }
}

export default reducerApp;