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

var OnboardingComponent = require('./app/OnboardingComponent');

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

AppRegistry.registerComponent('SomosApp', () => SomosApp);
