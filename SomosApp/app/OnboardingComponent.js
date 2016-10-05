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
  AsyncStorage,
  Alert
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
        AsyncStorage.setItem("lat", position.coords.latitude.toString());
        AsyncStorage.setItem("lng", position.coords.longitude.toString());
        AsyncStorage.setItem("timestamp", position.timestamp.toString());
        this.props.navigator.push({
          title: 'Loading',
          component: Loading
        })
      },
      (error) => {Alert.alert('Bummer', 'This app does not work without your location. To use this app, change the permissions in your settings.')}
    )
  }

  renderCustomSkin() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.fullScreen}>
          <Video
            source={require('../purple1.mp4')}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={true}
            style={styles.backgroundVideo}
          />
          <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex: 2, justifyContent: 'center'}}>
              <Image source={require('../images/LOGO.png')} resizeMode='contain'
                style={styles.logoMain}
              />
              <Text style={styles.subTitle}>
                Become part of the show.
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.geoLocate.bind(this)} style={styles.whiteButton}>
                <Text style={styles.buttonText}>
                  FIND MY CONCERT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*

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
          </TouchableOpacity>*/}
        </View>
      </View>
    );
  }

  render() {
    return this.renderCustomSkin();
  }
}

module.exports = OnboardingComponent
