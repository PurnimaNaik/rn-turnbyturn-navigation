'use strict';

import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View style={styles.container}>
        <Text>Hiiii</Text>
    <MapView
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
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
