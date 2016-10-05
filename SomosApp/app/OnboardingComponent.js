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
  AsyncStorage
} from 'react-native';

import Video from 'react-native-video';

const styles = require('./styles.js');
const Loading = require('./LoadingComponent');

class OnboardingComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    rate: 1.5,
    volume: 0,
    muted: true,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom',
  };

  nextComp(){
    this.props.navigator.push({
      title: 'Loading',
      component: Loading
    })
  }

  geoLocate(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("****************************");
        // console.log(position);
        AsyncStorage.setItem("lat", position.coords.latitude.toString());
        AsyncStorage.setItem("lng", position.coords.longitude.toString());
        AsyncStorage.setItem("timestamp", position.timestamp.toString());
        // this.nextComp()
        this.props.navigator.push({
          title: 'Loading',
          component: Loading
        })
      },
      (error) => {alert(error.message)}
    )
  }
  // RESULTS:
  // { coords:
  //    { speed: -1,
  //     longitude: -122.406417,
  //      latitude: 37.785834,
  //      accuracy: 5,
  //      heading: -1,
  //      altitude: 0,
  //     altitudeAccuracy: -1 },
  // timestamp: 1475530012484.17 }

  renderCustomSkin() {

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.fullScreen}>
          <Video
            source={require('../purple1.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={true}
            style={styles.backgroundVideo}
          />
          <Image source={require('../images/LOGO.png')} resizeMode='contain'
            style={styles.logoMain}
          />

          <Text style={styles.subTitle}>
            Become part of the show.
          </Text>

          <TouchableOpacity onPress={this.geoLocate.bind(this)} style={styles.whiteButton}>
            <Text style={styles.buttonText}>
              FIND MY CONCERT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return this.renderCustomSkin();
  }
}

module.exports = OnboardingComponent
