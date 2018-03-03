import React from 'react';
import {MyMapComponent} from './Map';
import Header from '../header';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as newInfo from '../../Actions/actionAllStroll';

class CreateStroll extends  React.Component {
    constructor () {
        super ();
        this.state = {
            name: "",
            category: "",
            markers: [],
            length: 432,
            description: ""
        };
        this.revision = this.revision.bind(this);
        this.handelMarker = this.handelMarker.bind(this);
        this.changeCoordinatesOfMarker = this.changeCoordinatesOfMarker.bind(this);
    }

    componentDidMount(){newInfo.allCategory()};
//-----------------------------------------------------------------------------
    handelMarker(lat,lng){
        let markers = this.state.markers;
        markers.push({
            lat: lat, lng: lng
        });
        this.setState({markers:markers});
    }

    changeCoordinatesOfMarker(index, lat, lng){
        let markers = this.state.markers;
        markers[index].lat = lat; markers[index].lng = lng;
        console.log('changedMarkers', markers); this.setState({markers:markers});
    }

//-----------------------------------------------------------------------------
    revision () {
             fetch("http://localhost:3001/createStroll",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({name :this.state.name, category: this.state.category, markers: this.state.markers, length: this.state.length, description: this.state.description, user: JSON.parse(localStorage.getItem('email'))})
                });

    }

//-----------------------------------------------------------------------------
  render() {
    return (
      <div>
          <Header/>
          <form className="container w-50 my-4" onSubmit={this.revision}>
              <div className="row m-3">
                  <input type="text" placeholder="Name stroll" className="w-50 mx-auto " value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})}/>
              </div>
              <div className="row m-3">
                  <select className="w-50 mx-auto" value={this.state.category} onChange={(e)=>this.setState({category:e.target.value})}>
                      <option value="" disabled hidden>Select your category</option>
                      {this.props.store.allCategory.map((value, index) => {
                          return (
                              <option key={index} value={value.name}>{value.name}</option>
                          )
                      })
                      }
                  </select>
              </div>
              <MyMapComponent markers={this.state.markers}
                              handelMarker={this.handelMarker}
                              changeCoordinatesOfMarker={this.changeCoordinatesOfMarker}
                              containerElement={<div style={{height: '400px'}}/>}
                              mapElement={<div style={{height: `100%`}}/>}
              />
              <div className="row m-3">
                  <p className="mx-auto border rounded p-2 border-success">Length: {this.props.length}</p>
              </div>
              <div className="row m-3">
                  <textarea placeholder="Route Description" className="col" style={{height:200}} value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}/>
              </div>
              <div className="row m-3">
                  <button type="submit" className="btn btn-primary px-2 col" >Create stroll</button>
              </div>
          </form>
      </div>
    );
  }
}

export default connect(store => ({store: store}))(withRouter(CreateStroll))