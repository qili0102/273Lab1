import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {signinAction, signupAction} from './actions'
import store from './store'

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    click(){
        this.props.testClick();
    }

    signclick(){
        this.props.signupClick();
    }

    LoginNav() {
        if(!this.props.login){
            return (
                <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li onClick={this.click.bind(this)}><a href="#" >Sign In</a></li>
                        <li ><a href="#">Sign Up</a></li>
                </ul>
            );
        }
        return null;
    }
    
    InNav() {
        if(this.props.login){
            return (
                <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li onClick={this.signclick.bind(this)}><a href="#" >Sign Out</a></li>
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
                {this.props.username}
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        testClick: () => dispatch(signinAction("SignIn")),
        signupClick: () => dispatch(signupAction("SignUp"))
    };
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        username: state.username,
        password: state.password
    };
}

const DefaultApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)

export default DefaultApp;
