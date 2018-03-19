import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {signinAction, getProjectAction, getBidAction} from './actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

function BidList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
    <li>
        {/* {JSON.stringify(number)} */}
          <p>Project Title: {number.title}</p>
            <p>Employer: {number.post_user}</p>
            <p>Price: {number.price}</p>
            <p> <button type="button" class="btn btn-default">Bid</button></p>
    </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

class Dashboard extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        if (sessionStorage.getItem('Email')) {
            axios.post('/getbidbyuser', {email:sessionStorage.getItem('Email')}).then((response)=>{
                // dispatch(signinAction(response.data));
                // alert(response.data);
                this.props.setBids(response.data);
            } 
        );
        }
    }

    render(){
        // fetch('/index').then(res=>res.json())
        // .then(json=>console.log(json.message));
        let user = sessionStorage.getItem('User');
        let bid = store.getState().bids;
        // let listitems = projects.map((proj)=><div>{proj}</div>);
        if (user!=null) {
            return (
                <div>
                    <div>
                        {
                            bid?
                            <BidList numbers={bid} />
                            :null
                        }
                    </div>
                </div>  
            )
        }
        else{
            return (
                <Redirect to="/" />
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
        setProjects:(payload)=>dispatch(getProjectAction(payload)),
        setBids:((payload)=>dispatch(getBidAction(payload)))
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
)(Dashboard))

export default DefaultApp;