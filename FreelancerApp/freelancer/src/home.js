import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {signinAction, getProjectAction} from './actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import img from './img/favicon.ico';

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
    <li>
          <p>Title: {number.title}</p>
            <p>Employer: {number.post_user}</p>
            <p>Desciption: {number.desc}</p>
            <p>Skills Required: {number.skills}</p>
            <p>Budget Range: {number.budgetRange}</p>
            <p>Status: {number.status} <button type="button" class="btn btn-default">Bid</button></p>
    </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        if (sessionStorage.getItem('Email')) {
            axios.post('/getopenproject').then((response)=>{
                // dispatch(signinAction(response.data));
                // alert(response.data);
                this.props.setProjects(response.data);
            } 
        );
        }
    }

    render(){
        // fetch('/index').then(res=>res.json())
        // .then(json=>console.log(json.message));
        let user = sessionStorage.getItem('User');
        let projects = store.getState().projects;
        // let listitems = projects.map((proj)=><div>{proj}</div>);
        if (user!=null) {
            return (
                <div>Home Page, welcome {user}
                    <div>
                        {
                            projects?
                            <NumberList numbers={projects} />
                            :null
                        }
                    </div>
                </div>  
            )
        }
        else{
            return (
                <div>Home Page, you have not sign in {user}</div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(payload)=>dispatch(signinAction(payload)),
        testclick: (payload) => {
            axios.post('/getuser', {email:payload.email}).then((response)=>{
                if (response.status===200 && response.data.password===payload.password) {
                    dispatch(signinAction(response.data));
                } else {
                    alert("try again?");
                }
            })
        },
        setProjects:(payload)=>dispatch(getProjectAction(payload))
        // userclick: (payload) => dispatch(checkEmail(payload))
    };
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
    mapStateToProps,
    mapDispatchToProps
)(Home))

export default DefaultApp;