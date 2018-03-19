import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {signoutAction, signinAction} from './actions'
import store from './store'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        if (sessionStorage.getItem('Email')) {
            axios.post('/getuser', {email:sessionStorage.getItem('Email')}).then((response)=>{
                    // dispatch(signinAction(response.data));
                    this.props.setUser(response.data);
                } 
            )
        }
    }

    signclick(){
        this.props.signupClick();
    }

    LoginNav() {
        if(!this.props.login){
            return (
                <ul className="nav navbar-nav">
                        <li ><Link to="/">Home</Link></li>
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
                        <li ><Link to="/">Home</Link></li>
                        <li ><Link to="/dashboard">Dashboard</Link></li>
                        <li onClick={this.signclick.bind(this)}><Link to="/login">Sign Out</Link></li>
                        <li ><Link to="/profile">My Account</Link></li>
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
        setUser:(payload)=>dispatch(signinAction(payload)),
        signupClick: () => dispatch(signoutAction())
    };
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        user_info: state.user_info,
        projects:state.projects,
        bids:state.bids
    };
}

const DefaultApp = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar))

export default DefaultApp;
