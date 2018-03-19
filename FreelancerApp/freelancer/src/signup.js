import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
var bcrypt = require('bcryptjs');

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            redirect:false
        }
        
    }

    click(event){
        event.preventDefault();
        let user_signup={
            email:"",
            username:"",
            password:"",
            img_path:"",
            desc:"",
            skills:"",
            post_prj:"",
            bid_prj:""
        }

        var hashedPwd = bcrypt.hashSync(this.refs['pwd'].value, 8)
        user_signup.email = this.refs['email'].value;
        user_signup.password = hashedPwd;
        user_signup.username = this.refs['username'].value;

        axios.post('/adduser', user_signup).then((response)=>{
            alert(response.status)
            if (response.status==201) {
                alert("Sign up successful!");
                this.setState({redirect:true});
            } else if (response.status==400){
                alert("Sign up failure! Try another email?");
            }
        });
    }

    render(){
        if(this.state.redirect===false){
            return (
                <div className = "row">
                <h1>Register</h1> 
                <div className = "col-sm-4"></div>
                <form className = "col-sm-4">
                    <div className="form-group">
                        <label >Email:</label>
                        <input type="text" className="form-control" ref="email" />
                    </div>
                    <div className="form-group">
                        <label >User Name:</label>
                        <input type="text" className="form-control" ref="username" />
                    </div>
                    <div className="form-group">
                        <label >Password:</label>
                        <input type="password" className="form-control" ref="pwd" />
                    </div>
                    <button className="btn btn-default" onClick={this.click.bind(this)}>Submit</button>
                </form>
                <div className = "col-sm-4"></div>
                </div>
            )
        }
        return (
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // login: state.login,
        // username: state.username,
        // password: state.password
        login: state.login,
        user_info: state.user_info,
        projects:state.projects,
        bids:state.bids
    };
}

const DefaultApp = withRouter(connect(
    mapStateToProps
)(Signup))

export default DefaultApp;