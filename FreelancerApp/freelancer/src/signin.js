import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {signinAction,checkEmail} from './actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class LogIn extends React.Component{
    constructor(props){
        super(props);
    }

    click(event){
        event.preventDefault();
        // alert("click");
        // axios.post('/adduser',{
        //     username : this.refs['username'].value,
        //     password: this.refs['pwd'].value
        // }).then(function (response) {
        //     console.log(response.status);
        //   })
        //   .catch(function (error) {
        //     alert(error);
        //   });
        // let status;
        // this.getUser().then(response=>status = response.status)
        // if (status=="200") {
            this.props.userclick({email:this.refs['email'].value});
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
                        <label >Email:</label>
                        <input type="text" className="form-control" ref="email" />
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
            this.props.testclick()
            return (
                <Redirect to="/" />
            );
        }
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        testclick: (payload) => dispatch(signinAction(payload)),
        userclick: (payload) => dispatch(checkEmail(payload))
    };
}

const mapStateToProps = (state) => {
    return {
        // login: state.login,
        // username: state.username,
        // password: state.password
        login: false,
        user_info: state.user_info,
        projects:state.projects,
        bids:state.bids
    };
}

const DefaultApp = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn))

export default DefaultApp;