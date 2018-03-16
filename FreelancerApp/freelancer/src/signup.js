import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';

class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            status:"",
            msg:""
          }
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
        this.getUser().then(response=>this.setState({username: response.data.username, status: response.status}))
        if (this.state.status=="200") {
            this.setState({msg : "Try another name"});
        }
        if (this.state.status=="203") {
            this.state.msg ="Try another name";
        }
        if (this.state.status=="204") {
            axios.post('/adduser',{
            username : this.refs['username'].value,
            password: this.refs['pwd'].value
            })
        }
        this.setState({
            username: '',
            status:"",
            msg:""
          })
    }

    getUser(){
        return axios.post('/comfirm', {
            username : this.refs['username'].value,
            password: this.refs['pwd'].value
        });
    }

    render(){
        if(store.getState().login==false){
            return (
                <div className = "row">
                <h1>Register</h1>
                {this.state.status}
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
        return (
            <Redirect to="/" />
        );
    }
}

export default Signup;