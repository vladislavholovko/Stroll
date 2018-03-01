import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Registration from './Registration/Registration';
import Login from './Registration/Login';
import CreateStroll from './Map/CreateStroll';
import AllStroll from './Stroll/AllStroll';
import Filter from './Filter/Filter';
import Test from './Test';
import './App.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import addStroll from './Reducers/newCart';

export const store = createStore(addStroll, applyMiddleware(logger));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/" component={Login}/>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/createstroll" component={CreateStroll}/>
                        <Route path="/allstroll" component={AllStroll}/>
                        <Route path="/filter" component={Filter}/>
                        <Route path="/test" component={Test}/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

