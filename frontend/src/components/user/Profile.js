import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';

class UserProfile extends Component {

    constructor( props ){
        super( props );
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }


    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = ( place ) => {
        const address = place.formatted_address,
            addressArray =  place.address_components,
            city = this.getCity( addressArray ),
            area = this.getArea( addressArray ),
            state = this.getState( addressArray ),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
// Set these values in the state.
        this.setState({
            address: ( address ) ? address : '',
            area: ( area ) ? area : '',
            city: ( city ) ? city : '',
            state: ( state ) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <div>

            <GoogleMap
                defaultCenter = { { lat: 37.333791, lng: -121.910626 } }
                defaultZoom = { 13 }
            >
                <Autocomplete
                    style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '100px'
                    }}
                    // onPlaceSelected={ this.onPlaceSelected }
                    types={['(regions)']}
                />
            </GoogleMap>
        </div>
        ));
        return(
            <div>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `600px`, width: '1450px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
};
export default UserProfile;
