import React from 'react';
import Header from '../header';
import {MyMapComponent} from "./Map";
import ReactStars from 'react-stars';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as addInfo from '../../Actions/actionAllStroll';

class AllStroll extends React.Component {
    constructor() {
        super();
        this.state = {
            idStroll: "",
            user: "",
            rating: 0,
            comments: ""
        };
        this.chooseRout = this.chooseRout.bind(this);
        this.content = this.content.bind(this);
        this.newComment = this.newComment.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    componentDidMount(){
        addInfo.allStroll();
        addInfo.allComments();
        addInfo.allFavorites();


    };
//-----------------------------------------------------------------------------
    chooseRout() {
        return (
            <div className="container w-75 my-4">
                <div className="row m-3">
                    <h4 className="mx-auto">CHOOSE A ROUTE</h4>
                </div>
                <div className="row m-3">
                    <select className="w-50 mx-auto" value={this.state.idStroll} onChange={(e) =>this.setState({idStroll: e.target.value})}>
                        <option value="" disabled hidden>Choose a route</option>
                        {

                            this.props.store.allStroll.map((value, index) => {
                                return (
                                    <option key={index} value={value.id}>{value.name}</option>
                                )
                            })

                        }
                    </select>
                </div>
                <hr className="w-75"/>
            </div>
        )
    }

    middleRating(){
        let rating=0;
        let count=0;
        this.props.store.allComments.map((value) => {
            if (Number(value.idMap) === Number(this.state.idStroll)) {
                rating+=Number(value.rating);
                count++;
            }
        });
        return  <ReactStars edit={false} count={10} size={24} value={rating/count}/>;
    }
//-----------------------------------------------------------------------------
    content() {
        return this.props.store.allStroll.map((value, index) => {
            if (Number(value.id) === Number(this.state.idStroll)) {
                return (
                    <div key={index} className="container w-75 my-4">
                        <div className="row justify-content-center m-3">
                            <div className="mx-2">{this.middleRating()}</div>
                            <form className="mx-2">{this.favorite()}</form>
                        </div>
                        <div className="row m-3">

                        </div>
                        <div className="row m-3">
                            <p className="w-75 mx-auto border rounded p-2 border-info">{value.description}</p>
                        </div>
                        <MyMapComponent
                            markers={value.markers}
                            containerElement={<div style={{height: '400px'}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                        />
                        <div className="row m-3 justify-content-center">
                            <p className="mx-auto border rounded p-2 border-success">Type of walks: {value.category}</p>
                            <p className="mx-auto border rounded p-2 border-success">Length: {value.length} m.</p>
                            <p className="mx-auto border rounded p-2 border-success">Create: {value.user}</p>
                        </div>
                        <hr className="w-75"/>
                        {/*----------------------------------------------------------*/}
                        <div className="row m-1">
                            <h3 className="mx-auto">All Comments</h3>
                        </div>
                        {this.allComments()}
                        {/*----------------------------------------------------------*/}
                        <form className="container w-75 my-4">
                            <div className="row m-3">
                                <textarea placeholder="Add comment" className="col" style={{height: 200}}
                                          value={this.state.comments}
                                          onChange={(e) => this.setState({comments: e.target.value})}/>
                            </div>
                            <div className="row m-3">
                                <div className="mx-auto">
                                    <ReactStars count={10} size={24} half={false} value={this.state.rating} onChange={(e)=>this.setState({rating:e})}/>
                                </div>
                            </div>
                            <div className="row m-3">
                                <button type="submit" className="btn btn-primary w-50 mx-auto"  onClick={this.newComment}>Create stroll</button>
                            </div>
                        </form>
                        <hr/>
                        {/*----------------------------------------------------------*/}
                        <div className="row m-3">
                            <h4 className="mx-auto">All strolls of the user "{value.user}"</h4>
                        </div>
                            {this.allMap(value.user)}
                    </div>
                )
            }
        })
    }
//-----------------------------------------------------------------------------
    favorite () {
        let butt;
        let map = this.props.store.allFavorites.find((value) => {
            return (Number(value.idMap) === Number(this.state.idStroll) && value.user === JSON.parse(localStorage.getItem('email')))
        });

        if (map !== undefined)
        {
            butt = <button onClick={()=>this.deleteFavorite(map.id)} className=" rounded btn-warning" title="This path is already in the chosen">&#x2764;</button>;}
        else {
            butt = <button onClick={this.addFavorite} className="rounded btn-secondary" title="Add to favorites
">&#x2661;</button>;
        }
        return butt;
    }

    addFavorite () {
        fetch("http://localhost:3001/favorites",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({user: JSON.parse(localStorage.getItem('email')), idMap:Number(this.state.idStroll)})
            });
    }

    deleteFavorite (e) {
            fetch("http://localhost:3001/favorites/"+e,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            });
    }
//-----------------------------------------------------------------------------
    allComments () {
        return this.props.store.allComments.map((value, index) => {
            if (Number(value.idMap) === Number(this.state.idStroll)) {
                return (
                    <div key={index} className=" border rounded container my-4 w-75">
                        <div className="row m-1">
                            <div className="col"><b>{value.user}</b></div>
                            <ReactStars edit={false} count={10} size={24} value={value.rating}/>
                        </div>
                        <div className="row m-1">
                            <div className="col">{value.description}</div>
                        </div>
                    </div>
                )
            }
        })
    }

    newComment () {
        fetch("http://localhost:3001/comments",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({user: JSON.parse(localStorage.getItem('email')),idMap:Number(this.state.idStroll), description:this.state.comments, rating: this.state.rating})
            });
    }
//-----------------------------------------------------------------------------
    allMap (e) {
        let allMap = [];
        this.props.store.allStroll.map((value, index) => {
            if (value.user === e){
                allMap.push(<div key={index} className="row" onClick={() =>this.setState({idStroll: value.id})}>
                                <a className="col border rounded bg-success text-white p-1">{value.name}</a>
                            </div>)
            }});
        return allMap;
    }


//-----------------------------------------------------------------------------
    render() {
        return (
            <div>
                <Header/>
                {this.chooseRout()}
                {this.content()}
            </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(AllStroll))