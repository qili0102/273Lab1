import React from 'react';

class Home extends React.Component{
    render(){
        fetch('/index').then(res=>res.json())
        .then(json=>console.log(json.message));
        let user = sessionStorage.getItem('User');
        if (user!=null) {
            return (
                <div>Home Page, welcome {user}</div>
            )
        }
        else{
            return (
                <div>Home Page, you have not sign in {user}</div>
            )
        }
    }
}

export default Home;