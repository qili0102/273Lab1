import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {signinAction} from './actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class LogIn extends React.Component{
    constructor(props){
        super(props);
    }

    getUser(){
        return axios.post('/comfirm', {
            username : this.refs['username'].value,
            password: this.refs['pwd'].value
        });
    }

    click(event){
        event.preventDefault();
        alert("click");
        // axios.post('/adduser',{
        //     username : this.refs['username'].value,
        //     password: this.refs['pwd'].value
        // }).then(function (response) {
        //     console.log(response.status);
        //   })
        //   .catch(function (error) {
        //     alert(error);
        //   });
        let status;
        this.getUser().then(response=>status = response.status)
        // if (status=="200") {
            this.props.testclick({login:true,username:this.refs['username'].value, password:this.refs['pwd'].value})
            alert(store.getState().login);
        // }
        sessionStorage.setItem('User',store.getState().username);
    }

    render(){
        if(!sessionStorage.getItem('User')){
            return (
                <div className = "row">
                <h1>Login</h1>
                <div className = "col-sm-4"></div>
                <form className = "col-sm-4">
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
        else{
            return (
                <Redirect to="/" />
            );
        }
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        testclick: (payload) => dispatch(signinAction(payload))
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
)(LogIn))

export default DefaultApp;