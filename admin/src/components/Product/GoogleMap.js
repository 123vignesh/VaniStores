import React, { Component } from 'react'
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions } from 'antd';
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey("AIzaSyAlELdCDd8CRoQr-ukhh4CzGh_r_Q5BJRU");
Geocode.enableDebug();

export default class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {

            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 15,
            height: 400,
            mapPosition: {
                lat: 0,
                lng: 0,
            },
            markerPosition: {
                lat: 0,
                lng: 0,
            }


        }
    }


    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                console.log(response)
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: (address) ? address : '',
                                    area: (area) ? area : '',
                                    city: (city) ? city : '',
                                    state: (state) ? state : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    };



    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };


    onMarkerDragFunction = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    }


    onPlaceSelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)

        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
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
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >

                <Marker
                    draggable={true}
                    onDragEnd={this.onMarkerDragFunction}
                    position={{ lat: -34.397, lng: 150.644 }}
                >
                    <InfoWindow>
                        <div>Hello</div>
                    </InfoWindow>
                </Marker>


            </GoogleMap>
        ));
        return (
            <>
                <div style={{ marginBottom: "10px" }}>
                    <Autocomplete

                        className="SignupInputs wid"
                        placeholder={"Enter Your Delivery location"}
                        onPlaceSelected={this.onPlaceSelected}
                        types={['(regions)']}
                    />
                    <input value={this.state.city} placeholder="city" className="SignupInputs loca" />
                    <input value={this.state.area} placeholder="Area" className="SignupInputs loca" />
                    <input value={this.state.state} placeholder="State" className="SignupInputs loca" />
                    <input value={this.state.address} placeholder="Address" className="SignupInputs loca" />
                </div>
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlELdCDd8CRoQr-ukhh4CzGh_r_Q5BJRU&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `350px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </>
        )
    }
}
