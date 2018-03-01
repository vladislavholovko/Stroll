import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps";

export const MyMapComponent = withGoogleMap((props) => {
        return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat:49.4436409, lng:32.05685149}}
        >
            {props.markers.map((marker,index)=>(
                <Marker
                    key={index}
                    position={marker}
                />
            ))}
            <Polyline path={props.markers}>

            </Polyline>


        </GoogleMap>
    )
});