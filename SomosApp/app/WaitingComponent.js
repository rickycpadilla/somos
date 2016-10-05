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

class Instructions extends Component {
  render(){
    return (
      <View>
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
    )
  }
}

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
    let that = this;
    firebase.database().ref('/timestamps').on('value',function(snapshot){
      AsyncStorage.multiGet(["timestamp", "lat", "lng"], (err, stores) => {
          snapshot.forEach(function(childSnapshot){
            let dataTime = childSnapshot.key.toString().substring(0, 5);
            let currentTime = stores[0][1].toString().substring(0, 5);
            let dataLat = stores[1][1].toString().substring(0, 5);
            let currentLat = childSnapshot.val().venues[0].lat.toString().substring(0, 5);
            let dataLng = stores[2][1].toString().substring(0, 7);
            let currentLng = childSnapshot.val().venues[0].lng.toString().substring(0, 7);

            // NEEDS TO BE SOME LOGIC HERE TO HANDLE NO SHOWS!!!!!!
            if(dataTime === currentTime
              // UNCOMMENT 2 LINES BELOW TO MAKE SURE IT COMPARES LOCATIONS!!!!!!!
              && dataLat === currentLat &&
              dataLng === currentLng
              && childSnapshot.val().venues[0].startShow == true
            ){
              AsyncStorage.getItem('videos', (err, result)=>{
                console.log(result);
                var arr = JSON.parse(result);
                that.setState({
                  rate: 1,
                  paused: !childSnapshot.val().venues[0].playing,
                  url: arr[0]
                })
              })

            }
          })
      })
    }.bind(this))
  }

  // _renderText(){
  //   return (
  //     <Text style={styles.subTitle2}>
  //       LIGHTSHOW STARTING SOON
  //     </Text>
  //     <Text style={styles.li}>
  //       INSTRUCTIONS:
  //     </Text>
  //     <Text style={styles.li}>
  //       1) Tilt device horizontally.
  //     </Text>
  //     <Text style={styles.li}>
  //       2) Maximize screen brightness.
  //     </Text>
  //     <Text style={styles.li}>
  //       3) Turn screen away from yourself.
  //     </Text>
  //   )
  // }

  render() {
    // AsyncStorage.getItem('videos', (err, result)=>{console.log(result);})
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

        { this.state.rate === 1 ? null : <Instructions /> }
        {/*<Text style={styles.subTitle2}>
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
        </Text>*/}

      </View>
    </View>)
  }
}

module.exports = WaitingComponent
