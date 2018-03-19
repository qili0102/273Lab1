// export function signinAction(payload) {
//     return {
//         type: "SignIn",
//         payload
//     };
// }

export function signinAction(payload) {
    return {
        type: "SetUser",
        payload
    };
}

export function signoutAction() {
    return {type: "SignOut"};
}

export function getProjectAction(payload) {
    return {
        type: "SetProject",
        payload
    };
}

export function getBidAction(payload) {
    return {
        type: "SetBid",
        payload
    };
}
