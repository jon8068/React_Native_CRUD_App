import React from 'react';
import {Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      console.log(user);
      if (user == null) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Display');
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" style={{marginTop: 20}} />;
    }
  }
}

export default withNavigation(SplashScreen);
