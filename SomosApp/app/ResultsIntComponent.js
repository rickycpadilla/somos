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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BaseInput from '../node_modules/react-native-textinput-effects/lib/BaseInput';



const styles = require('./styles.js')

class ResultsIntComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bandName: "Coldplay",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/somos-39d0c.appspot.com/o/coldplay.jpg?alt=media&token=e8e22677-4c8d-4cfb-a67b-6055c2e7a433",
    venue: "Galvanize - Platte",
    seatNumber: null,
  }

  static propTypes = {
    easing: PropTypes.func,
    height: PropTypes.number,
  };

  static defaultProps = {
    easing: Easing.bezier(0.2, 1, 0.3, 1),
    height: 60,
  };

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      height: inputHeight,
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const inputWidth = width * 0.6;

    const flatLabelStyle = StyleSheet.flatten(labelStyle);
    let labelBackgroundColor = '#EBEAEA';
    if (flatLabelStyle && flatLabelStyle.backgroundColor) {
      labelBackgroundColor = flatLabelStyle.backgroundColor;
    }

    return (
      <KeyboardAwareScrollView>
        <View style={containerStyle} onLayout={this._onLayout}>
          <Animated.View style={{
            width: inputWidth,
            marginLeft: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [inputWidth * -1, 0],
            }),
          }}>
            <TextInput
              ref="input"
              {...this.props}
              style={[styles.textInput, inputStyle, { height: inputHeight }]}
              value={value}
              onBlur={this._onBlur}
              onFocus={this._onFocus}
              onChange={this._onChange}
            />
          </Animated.View>
          <TouchableWithoutFeedback onPress={this._focus}>
            <Animated.View style={{
              position: 'absolute',
              justifyContent: 'center',
              top: 0,
              height: inputHeight,
              width,
              left: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, inputWidth],
              }),
              backgroundColor: labelBackgroundColor,
            }}>
              <Text style={[styles.label, labelStyle]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  render() {
    return (

          <View style={{
            flex: 2,
            backgroundColor: 'white',
            alignSelf: 'stretch',
            textAlign: 'center',
          }}>

            <View style={{flex:1}} >
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>welcome to</Text>
              <Text>{this.state.bandName.toUpperCase()}</Text>
            </View>
            <View style={{flex:1}}>
              <Kaede
                label={'ENTER SEAT NUMBER'}
                labelStyle={{textAlign: 'center', fontFamily: 'ArialRoundedMTBold', backgroundColor: '#EADCF6', color: '#711ABD'}}
                style={{backgroundColor: 'black'}}
                inputStyle={{textAlign: 'right', fontFamily: 'ArialRoundedMTBold', fontSize: 25, backgroundColor: '#711ABD', color: 'white'}}
              />
            </View>

          </View>





    );
  }
}

module.exports = ResultsIntComponent
