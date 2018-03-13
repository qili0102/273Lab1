import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {signoutAction} from './actions'
import store from './store'
import {Link, withRouter} from 'react-router-dom'

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    signclick(){
        this.props.signupClick();
    }

    LoginNav() {
        if(!this.props.login){
            return (
                <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li ><Link to="/login">Sign In</Link></li>
                        <li ><Link to="/register">Sign Up</Link></li>
                </ul>
            );
        }
        return null;
    }
    
    InNav() {
        if(this.props.login){
            return (
                <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li onClick={this.signclick.bind(this)}><Link to="/login">Sign Out</Link></li>
                        <li ><a href="#">My Account</a></li>
                </ul>
            );
        }
        return null;
    }

    render(){
        let loginNav = this.LoginNav();
        let inNav = this.InNav();
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">FreeLancer</a>
                </div>
                {loginNav }
                {inNav }
                </div>
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signupClick: () => dispatch(signoutAction())
    };
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        username: state.username,
        password: state.password
    };
}

const DefaultApp = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar))

export default DefaultApp;
