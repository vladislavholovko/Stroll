import React from 'react';
import {Link} from 'react-router-dom';
export default class Header extends React.Component {
    render ()    {
        const nameUsers = JSON.parse(localStorage.getItem('email'));
        return (
            <nav className="navbar navbar-expand-lg bg-success p-3">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/createstroll" className="nav-link text-white">Create stroll</Link></li>
                        <li className="nav-item"><Link to="/allstroll" className="nav-link text-white">All stroll</Link></li>
                        <li className="nav-item"><a href="/filter" className="nav-link text-white">Filter</a></li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end text-light">
                    <div className="font-weight-bold">Hello:&nbsp;</div>
                    <div>{nameUsers}&nbsp;&nbsp; </div>
                    <Link to = "/" onClick={()=>localStorage.clear()} className="text-dark">&#x2718;</Link>
                </div>
            </nav>
        )
    };
}