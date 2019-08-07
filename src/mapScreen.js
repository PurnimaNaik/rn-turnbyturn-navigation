'use strict';

import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get("window");
import Geolocation from 'react-native-geolocation-service';
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.requestUserLocation();
  }

  requestUserLocation=()=>{
    // console.log('-----------req user loc-----------')
    Geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);


        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({
          initialPosition: initialRegion,
          searchRegion: initialRegion,
        }, ()=>{
          try{
            this.retrieveData();
            this.requestStations();

          }
          catch{
            console.log("error in retrieveData or requestStations");
          }

        });


        if(this.state.stationInState!=""){
        }

      },

      error => {
        console.log("-------2-------")
        console.log(error)
        Alert.alert(
          'Please allow "HEVO" to access your location while using the app',
          'Your current location will be displayed on the map and used to show you navigation path and estimated time of arrival',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //
            {text: 'Allow', onPress: () => {

              Linking.openURL('app-settings:').then((response)=>{


              })
            }
          },
          {text: 'Deny', onPress: () => {
            // console.log('Cancel Pressed')
          }
          , style: 'cancel'},
        ],

      )},

      // alert("Please allow "HEVO" to access your location while you are using the app"),
    //   {timeout: 3000, enableHighAccuracy: true}
    );
    }

  render() {
    return (
        <View style={styles.container}>
       <MapView
       style={styles.map}
       region={this.state.initialPosition}
       showsUserLocation = {true}
       showsMyLocationButton={false}
     >
     </MapView>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
      container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
      },

});

//  default Map;
