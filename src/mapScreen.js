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
var range=[];
export class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    var range = [
        {
            "latitude": 40.89567,
            "longitude": -74.01841
        },
        {
            "latitude": 40.89674,
            "longitude": -74.05335
        },
        {
            "latitude": 40.91452,
            "longitude": -74.08907
        },
        {
            "latitude": 40.90408,
            "longitude": -74.11681
        },
        {
            "latitude": 40.89648,
            "longitude": -74.13359
        },
        {
            "latitude": 40.91082,
            "longitude": -74.17637
        },
        {
            "latitude": 40.87047,
            "longitude": -74.18734
        },
        {
            "latitude": 40.84607,
            "longitude": -74.18265
        },
        {
            "latitude": 40.79888,
            "longitude": -74.18947
        },
        {
            "latitude": 40.80740,
            "longitude": -74.28751
        },
        {
            "latitude": 40.80468,
            "longitude": -74.28395
        },
        {
            "latitude": 40.79118,
            "longitude": -74.42618
        },
        {
            "latitude": 40.66004,
            "longitude": -74.43699
        },
        {
            "latitude": 40.64792,
            "longitude": -74.52183
        },
        {
            "latitude": 40.60510,
            "longitude": -74.31490
        },
        {
            "latitude": 40.54514,
            "longitude": -74.50023
        },
        {
            "latitude": 40.43048,
            "longitude": -74.51749
        },
        {
            "latitude": 40.32450,
            "longitude": -74.48520
        },
        {
            "latitude": 40.27409,
            "longitude": -74.50739
        },
        {
            "latitude": 40.36823,
            "longitude": -74.30595
        },
        {
            "latitude": 40.38680,
            "longitude": -74.17781
        },
        {
            "latitude": 40.36648,
            "longitude": -74.14218
        },
        {
            "latitude": 40.33428,
            "longitude": -74.09958
        },
        {
            "latitude": 40.33039,
            "longitude": -74.09876
        },
        {
            "latitude": 40.60010,
            "longitude": -74.00902
        },
        {
            "latitude": 40.57275,
            "longitude": -73.99596
        },
        {
            "latitude": 40.57296,
            "longitude": -73.99383
        },
        {
            "latitude": 40.57480,
            "longitude": -73.96949
        },
        {
            "latitude": 40.57770,
            "longitude": -73.95607
        },
        {
            "latitude": 40.57798,
            "longitude": -73.94260
        },
        {
            "latitude": 40.57835,
            "longitude": -73.93795
        },
        {
            "latitude": 40.58673,
            "longitude": -73.91088
        },
        {
            "latitude": 40.57031,
            "longitude": -73.86160
        },
        {
            "latitude": 40.57591,
            "longitude": -73.84797
        },
        {
            "latitude": 40.59087,
            "longitude": -73.80794
        },
        {
            "latitude": 40.59200,
            "longitude": -73.78420
        },
        {
            "latitude": 40.61621,
            "longitude": -73.82270
        },
        {
            "latitude": 40.66179,
            "longitude": -73.77944
        },
        {
            "latitude": 40.70615,
            "longitude": -73.83183
        },
        {
            "latitude": 40.72201,
            "longitude": -73.81945
        },
        {
            "latitude": 40.73796,
            "longitude": -73.79990
        },
        {
            "latitude": 40.78841,
            "longitude": -73.78993
        },
        {
            "latitude": 40.78793,
            "longitude": -73.81608
        },
        {
            "latitude": 40.83369,
            "longitude": -73.82697
        },
        {
            "latitude": 40.83810,
            "longitude": -73.87928
        },
        {
            "latitude": 40.89614,
            "longitude": -73.88457
        },
        {
            "latitude": 40.93745,
            "longitude": -73.87725
        },
        {
            "latitude": 40.93984,
            "longitude": -73.92439
        },
        {
            "latitude": 40.89265,
            "longitude": -73.97308
        },
        {
            "latitude": 40.89482,
            "longitude": -74.00142
        }
     ];

    this.state = {
        coords: this.decode(this.range)
    };
  }

  componentDidMount(){
    this.requestUserLocation();
  }

//   decode=(t,e)=>{
//     for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;)
//     {
//       a=null,h=0,i=0;
//       do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])
//     }
//     return d=d.map(function(t)
//     {
//       return{latitude:t[0],longitude:t[1]
//       }
//     }
//   )
// }

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
    <MapView.Polyline
     coordinates={this.state.coords}
     strokeWidth={4}
     strokeColor="red"
     />
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
