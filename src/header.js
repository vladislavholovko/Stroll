import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";

class Header extends React.Component {
    render ()    {
        const nameUsers = JSON.parse(localStorage.getItem('email'));
        return (
            <nav className="navbar navbar-expand-lg bg-success p-3">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-link text-white" onClick={()=>this.props.history.push('/createstroll')}>Create stroll</li>
                        <li className="nav-item nav-link text-white"  onClick={()=>this.props.history.push('/allstroll')}>All stroll</li>
                        <li className="nav-item nav-link text-white" onClick={()=>this.props.history.push('/filter')}>Filter</li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end text-light">
                    <div className="font-weight-bold">Hello:&nbsp;</div>
                    <div>{nameUsers}&nbsp;&nbsp; </div>
                    <a onClick={()=>{this.props.history.push('/');localStorage.clear()}} className="text-dark">&#x2718;</a>
                </div>
            </nav>
        )
    };
}
export default connect(store => ({store: store}))(withRouter(Header))