import React from 'react';
import store from './store';
import {Redirect} from 'react-router';
import axios from 'axios';
import {signinAction, getProjectAction} from './actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import img from './img/favicon.ico';

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    click(event){
        event.preventDefault();
        this.props.testclick({email:this.refs['email'].value, password: this.refs['pwd'].value});
    }

    componentWillMount(){
        if (sessionStorage.getItem('Email')) {
            axios.post('/getuser', {email:sessionStorage.getItem('Email')}).then((response)=>{
                    // dispatch(signinAction(response.data));
                    this.props.setUser(response.data);
                } 
            );
            axios.post('/getprojectbyuser', {email:sessionStorage.getItem('Email')}).then((response)=>{
                // dispatch(signinAction(response.data));
                // alert(response.data);
                this.props.setProjects(response.data);
            } 
        );
        }
    }

    render(){ 
        let user = store.getState().user_info;
            return (
                <div class="container">
                    <div class="span3 well">
                        <center>
                        <a href="#aboutModal" data-toggle="modal" data-target="#myModal">
                        <img src={img} name="aboutme" width="140" height="140" class="img-circle" />
                        </a>
                        <h3>{sessionStorage.getItem('User')}</h3>
                        <em>click my face for more</em><br /><br />
                        <button type="button" class="btn btn-default">Post Project</button>
                        <button type="button" class="btn btn-default">Edit Profile</button>
                        </center>
                    </div>
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                    <h4 class="modal-title" id="myModalLabel">More About Me</h4>
                                </div>
                                <div class="modal-body">
                                    <center>
                                    <img src={img} name="aboutme" width="140" height="140" border="0" class="img-circle" />
                                    {
                                        user ? 
                                        <h3 class="media-heading">{user.username}</h3>
                                        :<h3 class="media-heading">{}<small>USA</small></h3>
                                    }
                                    
                                    <span><strong>Skills: </strong></span>
                                    {
                                        user && user.skills ?
                                        <span class="label label-info">{user.skill}</span>
                                        : <span class="label label-info">No skill at the moment</span>
                                    }
                                        {/* <span class="label label-warning">HTML5/CSS</span>
                                        <span class="label label-info">Adobe CS 5.5</span>
                                        <span class="label label-info">Microsoft Office</span>
                                        <span class="label label-success">Windows XP, Vista, 7</span> */}
                                    </center>
                                    <hr />
                                    <center>
                                    {
                                        user && user.desc?
                                        <p class="text-left"><strong>Bio: </strong><br />
                                            {user.desc}
                                        </p>
                                        :
                                        <p class="text-left"><strong>Bio: </strong><br />
                                            No comment at the moment~
                                        </p>
                                    }
                                    <br />
                                    </center>
                                </div>
                                <div class="modal-footer">
                                    <center>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    {
                        user && user.desc?
                        <p class="text-left"><strong>Bio: </strong><br />
                            {user.desc}
                        </p>
                        :
                        <p class="text-left"><strong>Bio: </strong><br />
                            No comment at the moment~
                        </p>
                    }
                    </div>
                </div>
            )
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
)(Profile))

export default DefaultApp;