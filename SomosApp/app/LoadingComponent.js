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
  Modal
} from 'react-native';

import Video from 'react-native-video';

var Spinner = require('react-native-spinkit');

import { Kaede } from 'react-native-textinput-effects';

let Waiting = require('./WaitingComponent.js')

const styles = require('./styles.js');

var Results = require('./ResultsComponent');

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
    bandName: "Coldplay",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433",
    venue: "Galvanize - Platte",
    seatNumber: null,
  };

  onResultsLoad() {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  nextPage(){
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

  renderCustomSkin() {
    // NEED TO HAVE LOAD HAPPEN FOR A COUPLE SECONDS
    // setTimeout(
    //   () => {
    //     this.onResultsLoad()
    //   }, 3000
    // )
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle="light-content" />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          {/*<Results {...this.props}  onResultsLoad={this.onResultsLoad.bind(this)}/>*/}

          <View style={styles.cardContainer}>

            <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433"}}
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
                  label={'ENTER SEAT NUMBER'}
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
