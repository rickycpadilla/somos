'use strict';
import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image
} from 'react-native';

import Video from 'react-native-video';

const styles = require('./styles.js')

class ResultsComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    bandName: "Coldplay",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433",
    venue: "Galvanize - Platte",
    seatNumber: null,
  };

  render() {
    return (
      <View style={styles.cardContainer}>

        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433"}}
          resizeMode="cover"
          style={{
            flex: 2,
            backgroundColor: 'black',
            alignSelf: 'stretch',
            textAlign: 'center',
            top: 20,
          }} />

        <View style={{
          flex: 2,
          backgroundColor: 'white',
          alignSelf: 'stretch',
          textAlign: 'center',
        }}>
          <View style={{flex:1}}>
            <Text>welcome to</Text>
            <Text>{this.state.bandName.toUpperCase()}</Text>
          </View>
        </View>



      </View>
    );
  }
}

module.exports = ResultsComponent
