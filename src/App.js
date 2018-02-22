import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Registration from'./Registration/Registration';
import Login from'./Registration/Login';
import CreateStroll from './Map/CreateStroll';
import AllStroll from './Stroll/AllStroll';
import Filter from './Filter/Filter';
import './App.css';

export default class App extends  React.Component {
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/createstroll" component={CreateStroll}/>
                    <Route path="/allstroll" component={AllStroll}/>
                    <Route path="/filter" component={Filter}/>
                </div>
            </Router>
        )
    }
}

