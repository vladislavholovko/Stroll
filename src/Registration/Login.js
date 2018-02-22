import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends  React.Component {
    constructor () {
        super ();
        this.state ={
            email:'',
            password:'',
            users:[]
        };
        this.revision = this.revision.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(data => {this.setState({users: data})});

        if (localStorage.getItem('email')!==null){
            this.props.history.push('/allstroll');
        }
    };

    revision (e) {
        for (let i = 0; i<this.state.users.length;i++){
            if(this.state.users[i].email===this.state.email && this.state.users[i].password===this.state.password) {
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
                        <Link className="nav-link" to="/registration">If not registered click here</Link>
                    </div>
                </div>
            </form>
        )
    }
}
