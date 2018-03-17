export function signinAction(payload) {
    return {
        type: "SignIn",
        payload
    };
}

export function signoutAction() {
    return {type: "SignOut"};
}

export function checkEmail(payload) {
    return {type: "GetUser", payload};
}

