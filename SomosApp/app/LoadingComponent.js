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
  Modal,
  Alert,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import Video from 'react-native-video';
const dismissKeyboard = require('dismissKeyboard')

var Spinner = require('react-native-spinkit');

import { Kaede } from 'react-native-textinput-effects';

let Waiting = require('./WaitingComponent.js')

const styles = require('./styles.js');

var Results = require('./ResultsComponent');

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var config = require('./configFile.js');

firebase.initializeApp(config);

class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    setTimeout(
      () => {
        this.onResultsLoad()
      }, 3000
    )
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
    modalVisible: false,
    bandName: "",
    photoUrl: "",
    venue: "",
    seatNumber: null,
  }

  componentWillMount(){
    let that = this;
    firebase.database().ref('/timestamps').on('value',function(snapshot){
      // console.log(snapshot.val());

      // RESULTS
    //   { '1475578800':
	  //  { venues:
	  //     [ { lat: 39.7577553,
	  //         lng: -105.0076131,
	  //         photoUrl: 'https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433',
	  //         playing: false,
	  //         venueName: 'Galvanize - Platte',
	  //         videos: [ 'https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/draft1.mp4?alt=media&token=b345fbe4-d04c-41ea-b667-c1daf7c4e9d1' ] } ] } }

        AsyncStorage.multiGet(["timestamp", "lat", "lng"], (err, stores) => {
            snapshot.forEach(function(childSnapshot){
              let dataTime = childSnapshot.key.toString().substring(0, 5);
              let currentTime = stores[0][1].toString().substring(0, 5);
              let dataLat = stores[1][1].toString().substring(0, 6);
              let currentLat = childSnapshot.val().venues[0].lat.toString().substring(0, 6);
              let dataLng = stores[2][1].toString().substring(0, 8);
              let currentLng = childSnapshot.val().venues[0].lng.toString().substring(0, 8);

              // NEEDS TO BE SOME LOGIC HERE TO HANDLE NO SHOWS!!!!!!
              if(dataTime === currentTime
                // UNCOMMENT 2 LINES BELOW TO MAKE SURE IT COMPARES LOCATIONS!!!!!!!
                // && dataLat === currentLat &&
                // dataLng === currentLng
              ){
                console.log("success!");
                that.setState({
                  bandName: childSnapshot.val().venues[0].bandName,
                  photoUrl: childSnapshot.val().venues[0].photoUrl,
                  venue: childSnapshot.val().venues[0].venueName,
                  playing: childSnapshot.val().venues[0].playing,
                })

              } else {
                console.log("failure");
              }
            })

        });

      // AsyncStorage.multiGet(["timestamp", "lat", "lng"], (err, result) => {
      //   snapshot.forEach(function(childSnapshot){
      //     let dataTime = childSnapshot.key.toString().substring(0, 5);
      //     let currentTime = result.toString().substring(0, 5);
      //
      //     if(dataTime === currentTime){
      //       console.log(childSnapshot.val().venues);
      //
      //     }
      //   });
      // })

      // var data = snapshot.val();
      // console.log(data);
      // for(key in data){
      //   console.log(Object.keys(key));
      // }

      //
      // this.setState({bandName: !snapshot.val().Ricky, url: snapshot.val().URL});
      // this.setState({ready: true})
      // if(this.state.playing == true){
      // this.toggle()
      // }
    }).bind(this)
  }

  onResultsLoad(){
    this.setState({modalVisible: !this.state.modalVisible})
  }

  nextPage(){
    if (this.state.seatNumber == null){
      Alert.alert('Oh no!', 'You forgot to enter your seat number.')
    } else {
      AsyncStorage.setItem("seatNumber", this.state.seatNumber);
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // AsyncStorage.getItem("lat").then((value) => console.log(value));
      AsyncStorage.getItem("lng").then((value) => console.log(value));
      // AsyncStorage.getItem("seatNumber").then((value) => console.log(value));
      this.props.navigator.push({
        title: 'Waiting',
        component: Waiting
      })
      setTimeout(
        () => {
          this.onResultsLoad()
        }, 500
      )
    }
  }

  renderCustomSkin() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle="light-content" />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          {/*<Results {...this.props}  onResultsLoad={this.onResultsLoad.bind(this)}/>*/}
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.cardContainer}>

              <Image source={{uri: this.state.photoUrl}}
                resizeMode="cover"
                style={{
                  flex: 4,
                  backgroundColor: 'black',
                  alignSelf: 'stretch',
                  top: 20,
                }} />

              <View style={{
                flex: 4,
                backgroundColor: 'white',
                alignSelf: 'stretch',

              }}>

                <View style={{flex:1}}>
                  <Kaede
                    onChangeText={(seatNumber) => this.setState({seatNumber})}
                    label={"WHAT'S YOUR SEAT NUMBER?"}
                    labelStyle={{textAlign: 'center', fontSize: 12, fontFamily: 'ArialRoundedMTBold', backgroundColor: '#EADCF6', color: '#711ABD'}}
                    inputStyle={{textAlign: 'right', fontFamily: 'ArialRoundedMTBold', fontSize: 25, backgroundColor: '#711ABD', color: 'white'}}
                  />
                </View>

                <View style={{
                  flex:2,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: -10,

                }} >
                  <Text>welcome to</Text>
                  <Text style={styles.bandName}>{this.state.bandName.toUpperCase()}</Text>
                  <Text>at</Text>
                  <Text style={styles.venueName}>{this.state.venue.toUpperCase()}</Text>
                </View>
                <View style={{flex:1}} >
                  <TouchableOpacity style={styles.purpleButton} onPress={this.nextPage.bind(this)}>
                    <Text style={styles.whiteButtonText}>
                      JOIN LIGHTSHOW
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </TouchableWithoutFeedback>
        </Modal>
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


          <Spinner style={styles.spinner}
            isVisible={true}
            size={200}
            type='ChasingDots'
            color='#FFFFFF'/>
          <Text style={styles.subTitleLoad}>
            Finding your concert...
          </Text>

        </View>
      </View>
    );
  }

  render() {
    return this.renderCustomSkin();
  }
}

module.exports = LoadingComponent
