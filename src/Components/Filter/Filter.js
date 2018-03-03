import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Header from '../header';
import * as filterInfo from '../../Actions/actionAllStroll';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            searchStroll:[]
        };
        this.showNameInfo = this.showNameInfo.bind(this);
        this.showDescriptionInfo = this.showDescriptionInfo.bind(this);
        this.showFavorite = this.showFavorite.bind(this);
    }

    componentDidMount() {
        filterInfo.allStroll();
        filterInfo.allCategory();
        filterInfo.allFavorites();
    }
//-----------------------------------------------------------------------------
    showNameInfo(e) {
        document.getElementById("descriptionFilter").value = null;
        document.getElementById("typeFilter").value = null;
        let see = [];
        let sValue = e;
        let newList =  this.props.store.allStroll;
        let sList = newList.filter((value) => {
            let mTitle = value.name;
            return mTitle.indexOf(sValue) !== -1;
        });
        for (let i = 0; i < sList.length; i++) {
            if (e !== null) {
                see.push(sList[i])
            }
        }
        this.setState({searchStroll:see});
    }

    showDescriptionInfo (e) {
        document.getElementById("nameFilter").value = null;
        document.getElementById("typeFilter").value = null;
        let see = [];
        let sValue = e;
        let newList =  this.props.store.allStroll;
        let sList = newList.filter((value) => {
            let mTitle = value.description;
            return mTitle.indexOf(sValue) !== -1;
        });
        for (let i = 0; i < sList.length; i++) {
            if (e !== null) {
                see.push(see.push(sList[i]))
            }
        }
        this.setState({searchStroll:see});
    }


    showCategory (e) {
        document.getElementById("nameFilter").value = null;
        document.getElementById("descriptionFilter").value = null;
        let see = [];
        let sValue = e;
        let newList =  this.props.store.allStroll;
        let sList = newList.filter((value) => {
            let mTitle = value.category;
            return mTitle.indexOf(sValue) !== -1;
        });
        for (let i = 0; i < sList.length; i++) {
            if (e !== null) {
                see.push(see.push(sList[i]))
            }
        }
        this.setState({searchStroll:see});
    }

    showFavorite () {
        let users = JSON.parse(localStorage.getItem('email'));
        let favoriteId = [];
        this.props.store.allFavorites.map(value => {
            if (users === value.user) {
                let findStroll =  this.props.store.allStroll.find((val)=>{
                    return val.id===value.idMap
                });
                favoriteId.push(findStroll);

            }
        });
        this.setState({searchStroll:favoriteId})
    }

//-----------------------------------------------------------------------------
    render() {
        let search= this.state.searchStroll.map((value,index) =>{
            return(
                <div key={index} className="row border rounded bg-success text-white">
                    <div className="col-3">{value.name}</div>
                    <div className="col-2">{value.user}</div>
                    <div className="col-6">{value.description}</div>
                </div>
            )
        });
        return (
            <div>
                <Header/>
                <div className="container-fluid my-4">
                    <div className="row justify-content-around">
                        <div className="mx-1 col-3">
                            <label htmlFor="nameFilter" className="mx-1">Name: </label>
                            <input id="nameFilter" type="text" className=""
                                   onChange={(e) => {this.showNameInfo(e.target.value)}}/>
                        </div>
                        <div className="mx-1 col-4">
                            <label htmlFor="descriptionFilter" className="mx-1">Description: </label>
                            <input id="descriptionFilter" type="text" className="col-9"
                                   onChange={(e) => {this.showDescriptionInfo(e.target.value)}}/>
                        </div>
                        <div className="mx-1 col-2" >
                            <label htmlFor="lengthFilter" className="mx-1" >Length: </label>
                            <input id="lengthFilter" className="w-50" type="text" disabled/>
                        </div>
                        <div className="mx-1">
                            <label htmlFor="typeFilter" className="mx-1">Type: </label>
                            <select id="typeFilter" onChange={(e) => {this.showCategory(e.target.value)}}>
                                <option value="" disabled hidden>Select your category</option>
                                { this.props.store.allCategory.map((value, index) => {
                                    return (
                                        <option key={index} value={value.name}>{value.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className="mx-1">
                            <button title="Favorites" className="rounded btn-warning" onClick={this.showFavorite}>&#x2764;</button>
                        </div>
                    </div>
                    {search}
                </div>
            </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(Filter))