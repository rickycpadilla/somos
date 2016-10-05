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
  NavigatorIOS,
  StatusBar
} from 'react-native';

const styles = require('./app/styles.js')

import Video from 'react-native-video';

// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");
// var config = require('./app/configFile.js');
//
// firebase.initializeApp(config);

var OnboardingComponent = require('./app/OnboardingComponent');
var LoadingComponent = require('./app/LoadingComponent');



class SomosApp extends Component {
  render(){
    return (
      <NavigatorIOS
        style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{component: OnboardingComponent, title: 'test'}}/>
    )
  }
}


// // WORKING CODE BELOW
// class SomosApp extends Component {
//   constructor(props) {
//     super(props);
//     // this.onLoad = this.onLoad.bind(this);
//     // this.onProgress = this.onProgress.bind(this);
//   }
//   state = {
//     playWhenInactive: true,
//     rate: 0.6,
//     volume: 1,
//     muted: false,
//     resizeMode: 'contain',
//     duration: 0.0,
//     currentTime: 0.0,
//     controls: false,
//     paused: false,
//     skin: 'custom',
//     url: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/Dust%20-%203227.mp4?alt=media&token=3f5deb08-920f-451b-9fc4-30ac76116a03"
//   };
//
//   render() {
//     return(
//     // return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
//     <View style={styles.container}>
//       <StatusBar hidden={true} />
//       <View style={styles.fullScreen}>
//         <Video
//           source={require('./test3.mp4')}
//           style={styles.fullScreen}
//           rate={this.state.rate}
//           paused={this.state.paused}
//           volume={this.state.volume}
//           muted={this.state.muted}
//           resizeMode={this.state.resizeMode}
//           repeat={true}
//           playWhenInactive={this.state.playWhenInactive}
//         />
//         <Text style={styles.subTitle}>
//           LIGHTSHOW STARTING SOON
//         </Text>
//         <Text style={styles.li}>
//           1) Maximize screen brightness.
//         </Text>
//         <Text style={styles.li}>
//           2) Turn screen away from yourself.
//         </Text>
//
//       </View>
//     </View>)
//   }
// }


AppRegistry.registerComponent('SomosApp', () => SomosApp);
