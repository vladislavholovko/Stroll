import React from 'react';

export default class Registration extends  React.Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            users:[]
        };
        this.revision = this.revision.bind(this);
        this.myForm = this.myForm.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(data => {this.setState({users: data})})
    };

    revision (e) {
        for (let i = 0; i<this.state.users.length;i++){
            if(this.state.users[i].email===this.state.email) {
                e.preventDefault();
                return alert('This email exist!');
            } else {
                console.log("No matches");
            }
        }
        localStorage.setItem('email', JSON.stringify(this.state.email));
        fetch("http://localhost:3001/users",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({email :this.state.email, password: this.state.password})
                });
        let path = `/allstroll`;
        this.props.history.push(path);
    }

    myForm () {
        return (
                <form className="column align-items-center" onSubmit={this.revision}>
                    <div className="d-flex justify-content-center"><h1>Registration</h1></div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary px-2" >Registration</button>
                    </div>
                </form>
        )
    }

    render () {
        return (
            <div className="container border w-50 p-2">
                {this.myForm()}
            </div>
    )
    }
}
