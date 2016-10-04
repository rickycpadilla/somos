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
  NavigatorIOS
} from 'react-native';

var config = require('./app/configFile.js');
const styles = require('./app/styles.js')

import Video from 'react-native-video';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

firebase.initializeApp(config);

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
//     this.onLoad = this.onLoad.bind(this);
//     this.onProgress = this.onProgress.bind(this);
//   }
//   state = {
//     rate: 1,
//     volume: 1,
//     muted: false,
//     resizeMode: 'contain',
//     duration: 0.0,
//     currentTime: 0.0,
//     controls: false,
//     paused: true,
//     skin: 'custom',
//     url: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/Dust%20-%203227.mp4?alt=media&token=3f5deb08-920f-451b-9fc4-30ac76116a03"
//   };
//
//   componentWillMount(){
//     firebase.database().ref('/Users').on('value',function(snapshot){
//       this.setState({paused: !snapshot.val().Ricky, url: snapshot.val().URL});
//       // this.setState({ready: true})
//       // if(this.state.playing == true){
//       // this.toggle()
//       // }
//     }.bind(this))
//   }
//
//   onLoad(data) {
//     this.setState({duration: data.duration});
//   }
//
//   onProgress(data) {
//     this.setState({currentTime: data.currentTime});
//   }
//
//   getCurrentTimePercentage() {
//     if (this.state.currentTime > 0) {
//       return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
//     } else {
//       return 0;
//     }
//   }
//
//   renderSkinControl(skin) {
//     const isSelected = this.state.skin == skin;
//     const selectControls = skin == 'native' || skin == 'embed';
//     return (
//       <TouchableOpacity onPress={() => { this.setState({
//         controls: selectControls,
//         skin: skin
//       }) }}>
//         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
//           {skin}
//         </Text>
//       </TouchableOpacity>
//     );
//   }
//
//   renderRateControl(rate) {
//     const isSelected = (this.state.rate == rate);
//
//     return (
//       <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
//         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
//           {rate}x
//         </Text>
//       </TouchableOpacity>
//     )
//   }
//
//   renderResizeModeControl(resizeMode) {
//     const isSelected = (this.state.resizeMode == resizeMode);
//
//     return (
//       <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
//         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
//           {resizeMode}
//         </Text>
//       </TouchableOpacity>
//     )
//   }
//
//   renderVolumeControl(volume) {
//     const isSelected = (this.state.volume == volume);
//
//     return (
//       <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
//         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
//           {volume * 100}%
//         </Text>
//       </TouchableOpacity>
//     )
//   }
//
//   renderCustomSkin() {
//     const flexCompleted = this.getCurrentTimePercentage() * 100;
//     const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
//
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
//           <Video
//             //source={require('./draft1.mp4')}
//             source={{uri: this.state.url}}
//
//             style={styles.fullScreen}
//             rate={this.state.rate}
//             paused={this.state.paused}
//             volume={this.state.volume}
//             muted={this.state.muted}
//             resizeMode={this.state.resizeMode}
//             onLoad={this.onLoad}
//             onProgress={this.onProgress}
//             onEnd={() => { AlertIOS.alert('Done!') }}
//             repeat={true}
//
//           />
//         </TouchableOpacity>
//
//         <View style={styles.controls}>
//           <View style={styles.generalControls}>
//             <View style={styles.skinControl}>
//               {this.renderSkinControl('custom')}
//               {this.renderSkinControl('native')}
//               {this.renderSkinControl('embed')}
//             </View>
//           </View>
//           <View style={styles.generalControls}>
//             <View style={styles.rateControl}>
//               {this.renderRateControl(0.5)}
//               {this.renderRateControl(1.0)}
//               {this.renderRateControl(2.0)}
//             </View>
//
//             <View style={styles.volumeControl}>
//               {this.renderVolumeControl(0.5)}
//               {this.renderVolumeControl(1)}
//               {this.renderVolumeControl(1.5)}
//             </View>
//
//             <View style={styles.resizeModeControl}>
//               {this.renderResizeModeControl('cover')}
//               {this.renderResizeModeControl('contain')}
//               {this.renderResizeModeControl('stretch')}
//             </View>
//           </View>
//
//           <View style={styles.trackingControls}>
//             <View style={styles.progress}>
//               <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
//               <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
//
//   renderNativeSkin() {
//     const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
//     return (
//       <View style={styles.container}>
//         <View style={styles.fullScreen}>
//           <Video
//             //source={require('./draft1.mp4')}
//             source={{uri: this.state.url}}
//             style={videoStyle}
//             rate={this.state.rate}
//             paused={this.state.paused}
//             volume={this.state.volume}
//             muted={this.state.muted}
//             resizeMode={this.state.resizeMode}
//             onLoad={this.onLoad}
//             onProgress={this.onProgress}
//             onEnd={() => { AlertIOS.alert('Done!') }}
//             repeat={true}
//             controls={this.state.controls}
//           />
//         </View>
//         <View style={styles.controls}>
//           <View style={styles.generalControls}>
//             <View style={styles.skinControl}>
//               {this.renderSkinControl('custom')}
//               {this.renderSkinControl('native')}
//               {this.renderSkinControl('embed')}
//             </View>
//           </View>
//           <View style={styles.generalControls}>
//             <View style={styles.rateControl}>
//               {this.renderRateControl(0.5)}
//               {this.renderRateControl(1.0)}
//               {this.renderRateControl(2.0)}
//             </View>
//
//             <View style={styles.volumeControl}>
//               {this.renderVolumeControl(0.5)}
//               {this.renderVolumeControl(1)}
//               {this.renderVolumeControl(1.5)}
//             </View>
//
//             <View style={styles.resizeModeControl}>
//               {this.renderResizeModeControl('cover')}
//               {this.renderResizeModeControl('contain')}
//               {this.renderResizeModeControl('stretch')}
//             </View>
//           </View>
//         </View>
//
//       </View>
//     );
//   }
//
//   render() {
//     return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
//   }
// }
//

AppRegistry.registerComponent('SomosApp', () => SomosApp);
