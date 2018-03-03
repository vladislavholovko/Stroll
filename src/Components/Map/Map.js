import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";

export const MyMapComponent = withGoogleMap((props) => {
    let markers = props.markers.map((value,index)=>{
        return(
            <Marker
                key={index}
                position={{lat: value.lat, lng: value.lng}}
                draggable={true}
                onDragEnd={(e)=>{
                    let lat = e.latLng.lat();
                    let lng = e.latLng.lng();
                    props.changeCoordinatesOfMarker(index,lat,lng)
                }
                }
            />)
    });

    return (
        <GoogleMap
            onClick={(e)=>{props.handelMarker(e.latLng.lat(),e.latLng.lng())}}
            defaultZoom={15}
            defaultCenter={{lat:49.4436409, lng:32.05685149}}
        >
            {markers}
        </GoogleMap>
    )
});