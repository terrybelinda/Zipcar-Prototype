import React from 'react'
import { Form, CardColumns, Button, Col, FormGroup } from "react-bootstrap";
import { withGoogleMap, GoogleMap, withScriptjs, Marker, google } from "react-google-maps";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';
// import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBVIEDKRd2EILFmktGgvAcV4gpKUJ2x0mY");
Geocode.enableDebug();


class Map extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
//    city: '',
//    area: '',
//    state: '',
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
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address;
    //  addressArray =  response.results[0].address_components,
    //  city = this.getCity( addressArray ),
    //  area = this.getArea( addressArray ),
    //  state = this.getState( addressArray );
  
    //  console.log( 'address', addressArray );
  
    this.setState( {
     address: ( address ) ? address : '',
    //  area: ( area ) ? area : '',
    //  city: ( city ) ? city : '',
    //  state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
 handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
		  getLatLng(results[0])
		  this.setState({
			address: address 
		  })
	  })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address
//    this.state.city !== nextState.city ||
//    this.state.area !== nextState.area ||
//    this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
//  getCity = ( addressArray ) => {
//   let city = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
//     city = addressArray[ i ].long_name;
//     return city;
//    }
//   }
//  };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
//  getArea = ( addressArray ) => {
//   let area = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0]  ) {
//     for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
//      if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
//       area = addressArray[ i ].long_name;
//       return area;
//      }
//     }
//    }
//   }
//  };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
//  getState = ( addressArray ) => {
//   let state = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    for( let i = 0; i < addressArray.length; i++ ) {
//     if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
//      state = addressArray[ i ].long_name;
//      return state;
//     }
//    }
//   }
//  };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };

/**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = ( place ) => {

const address = place.formatted_address,
   addressArray =  place.address_components,
//    city = this.getCity( addressArray ),
//    area = this.getArea( addressArray ),
//    state = this.getState( addressArray ),
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
// Set these values in the state.
  this.setState({
   address: ( address ) ? address : '',
//    area: ( area ) ? area : '',
//    city: ( city ) ? city : '',
//    state: ( state ) ? state : '',
   markerPosition: {
    lat: latValue,
    lng: lngValue
   },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })
  console.log('onPlaceSelected', addressArray);
 };
/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
   addressArray = [];
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address;
    //  addressArray =  response.results[0].address_components,
    //  city = this.getCity( addressArray ),
    //  area = this.getArea( addressArray ),
    //  state = this.getState( addressArray );
this.setState( {
     address: ( address ) ? address : '',
    //  area: ( area ) ? area : '',
    //  city: ( city ) ? city : '',
    //  state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
render(){

const searchPlace = (
	<PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
);

const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
      {/* For Auto complete Search Box */}
      {/* <Form> */}
	  {/* <Form.Row>
	      <Form.Group as={Col} controlId="formGridCity">
		  <Form.Label>Location</Form.Label>
			<Autocomplete
			style={{
				width: '100%',
				height: '40px',
				paddingLeft: '16px',
				marginTop: '2px',
				marginBottom: '100px'
			}}
			onPlaceSelected={ this.onPlaceSelected }
			types={['(regions)']}
			/>
		  </Form.Group>
		  <Form.Group as={Col} controlId="formGridStartDate">
            <Form.Label>Start date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridEndDate">
            <Form.Label>End date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridSearch">
		  <Button variant="success" type="submit" style={{ marginTop: '32px' }}>
            Search
          </Button>
		  </Form.Group>
	  </Form.Row>
	  </Form> */}
	  {/* <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '2px',
        marginBottom: '100px'
       }}
       onPlaceSelected={ this.onPlaceSelected }
       types={['(regions)']}
      /> */}
	  
{/*Marker*/}
      <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
	    {/* <Form> */}
		<Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Location</Form.Label>
            {/* <Form.Control type="name" placeholder="Enter name" value={ this.state.address} readOnly="readOnly"/> */}
			{searchPlace}
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridStartDate">
            <Form.Label>Start date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridEndDate">
            <Form.Label>End date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridSearch">
		  <Button variant="success" type="submit" style={{ marginTop: '32px' }}>
            Search
          </Button>
		  </Form.Group>
		</Form.Row>
           {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Enter city" value={ this.state.city} readOnly="readOnly"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridArea">
              <Form.Label>Area</Form.Label>
              <Form.Control type="name" placeholder="Enter area" value={ this.state.area} readOnly="readOnly"/>
            </Form.Group>
			<Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control type="name" placeholder="Enter state" value={ this.state.state} readOnly="readOnly"/>
            </Form.Group>
          </Form.Row>  */}
		{/* </Form> */}


     <AsyncMap
       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVIEDKRd2EILFmktGgvAcV4gpKUJ2x0mY&libraries=places"
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `100%` }} />
      }
     />
	 {/* {searchPlace} */}
    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map;
