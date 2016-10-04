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
  TextInput
} from 'react-native';

let ReactNative = require('react-native')

import { Kaede } from 'react-native-textinput-effects';

let Waiting = require('./WaitingComponent.js')

const styles = require('./styles.js')

class ResultsComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  //
  // state = {
  //   bandName: "Coldplay",
  //   photoUrl: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433",
  //   venue: "Galvanize - Platte",
  //   seatNumber: null,
  // }

  // nextScene(){
  //   this.setState({modalVisible: false})
  //   this.props.navigator.push({
  //     title: 'Waiting',
  //     component: Waiting
  //   })
  // }

  render() {
    return (

        <View style={styles.cardContainer}>

          <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433"}}
            resizeMode="cover"
            style={{
              flex: 4,
              backgroundColor: 'black',
              alignSelf: 'stretch',
              textAlign: 'center',
              top: 20,
            }} />

          <View style={{
            flex: 4,
            backgroundColor: 'white',
            alignSelf: 'stretch',
            textAlign: 'center',

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
              <TouchableOpacity style={styles.purpleButton} onPress={this.onResultsLoad.bind(this)}>
                <Text style={styles.whiteButtonText}>
                  JOIN LIGHTSHOW
                </Text>
              </TouchableOpacity>

            </View>
          </View>





        </View>
    );
  }
}

module.exports = ResultsComponent
