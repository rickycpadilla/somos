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
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';

let ReactNative = require('react-native')

import Video from 'react-native-video';

// GETTING VIDEO LOGIC
// 1) Get seat number
// 2) Make firebase call for video with same number
// 3) Have video start playing when song starts

const styles = require('./styles.js')

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

class WaitingComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    playWhenInactive: true,
    rate: 0.6,
    volume: 1,
    muted: false,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom',
    url: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/test3.mp4?alt=media&token=05a6b156-9314-4668-91d3-211b1d0f66c3"
  }

  componentWillMount(){

  }

  render() {
    AsyncStorage.getItem('videos', (err, result)=>{console.log(result);})
    // console.log('-----------------------------------------------');
    // console.log(AsyncStorage);
    return(
    // return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.fullScreen2}>
        <Video
          //source={require('../test3.mp4')}
          source={{uri: this.state.url}}
          style={styles.fullScreen}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          repeat={true}
          playWhenInactive={this.state.playWhenInactive}
        />
        <Text style={styles.subTitle2}>
          LIGHTSHOW STARTING SOON
        </Text>
        <Text style={styles.li}>
          INSTRUCTIONS:
        </Text>
        <Text style={styles.li}>
          1) Tilt device horizontally.
        </Text>
        <Text style={styles.li}>
          2) Maximize screen brightness.
        </Text>
        <Text style={styles.li}>
          3) Turn screen away from yourself.
        </Text>

      </View>
    </View>)
  }
}

module.exports = WaitingComponent
