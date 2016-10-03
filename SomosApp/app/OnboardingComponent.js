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

class OnboardingComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    rate: 1,
    volume: 0,
    muted: true,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom',
  };

  geoLocate(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("****************************");
        console.log(position);
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
            style={{resizeMode:'contain', height: 60, width: 180, alignSelf: 'center', top: 150}}
          />

          <Text style={{
            alignSelf: 'center',
            top: 160,
            fontSize: 14,
            fontFamily: 'ArialRoundedMTBold',
            color: '#FFFFFF',
            backgroundColor: 'transparent',
          letterSpacing: 2}}>
            Become part of the show.
          </Text>

          <TouchableOpacity onPress={this.geoLocate} style={{
            alignSelf: 'center',
            alignItems: 'center',
            top: 400,
            padding: 15,
            width: 215,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
          }}>
            <Text style={{

              alignSelf: 'center',
              fontSize: 12,
              color: '#711ABD',
              letterSpacing: 2,
              fontFamily: 'ArialRoundedMTBold',
            }}>
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

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#502A7D',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});

module.exports = OnboardingComponent
