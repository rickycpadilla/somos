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

const styles = require('./styles.js');

var Results = require('./ResultsComponent');

class LoadingComponent extends Component {
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
    modalVisible: false
  };

  onResultsLoad() {
    // this.props.navigator.push({
    //   title: 'Results',
    //   component: Results
    // })
    this.setState({modalVisible: true})
  }

  renderCustomSkin() {
    // NEED TO HAVE LOAD HAPPEN FOR A COUPLE SECONDS
    setTimeout(
      () => {
        this.onResultsLoad()
      }, 1000
    )
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle="light-content" />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Results />
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
