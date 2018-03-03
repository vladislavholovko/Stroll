import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as userInfo from '../../Actions/actionAllStroll';

class Login extends  React.Component {
    constructor () {
        super ();
        this.state ={
            email:'',
            password:''
        };
        this.revision = this.revision.bind(this);
    }

    componentDidMount(){
        userInfo.allUser();
        if (localStorage.getItem('email')!==null){
            this.props.history.push('/allstroll');
        }
    };

    revision (e) {
        for (let i = 0; i<this.props.store.allUser.length;i++){
            if(this.props.store.allUser[i].email===this.state.email && this.props.store.allUser[i].password===this.state.password) {
                localStorage.setItem('email', JSON.stringify(this.state.email));
                return this.props.history.push('/allstroll');
            } else {
                console.log("Nothing has coincided");
            }
        }

        e.preventDefault();
        alert('Check the data for correctness');
    }

    render () {
        return (
            <form className="container border w-50 p-2" onSubmit={this.revision}>
                <div className="column align-items-center">
                    <div className="d-flex justify-content-center"><h1>Login</h1></div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary px-2">Submit</button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <a onClick={()=>this.props.history.push('/registration')}>If not registered click here</a>
                    </div>
                </div>
            </form>
        )
    }
}
export default connect(store => ({store: store}))(withRouter(Login))