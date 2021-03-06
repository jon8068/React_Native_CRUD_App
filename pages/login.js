/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, StyleSheet, Alert, ActivityIndicator, BackHandler } from 'react-native';
import {Container, Form, Input, Item, Button, Label} from 'native-base';
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
      user: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  handleChangeText = input => {
    this.setState({email: input});
  };

  handleChangeText2 = input => {
    this.setState({password: input});
  };

  render() {

    return (
      <Container style={styles.contStyle}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.handleChangeText}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.handleChangeText2}
            />
          </Item>
          <Button
            style={styles.buttonStyle}
            full
            rounded
            primary
            onPress={(email, password) => {
              this.setState({isLoading: true});
              try {
                email = this.state.email;
                password = this.state.password;
                auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(user => {
                    Alert.alert('Sign Up Success!');
                    this.setState({
                      user,
                      isLoading: false,
                    });
                  });
              } catch (e) {
                console.log(e.message);
              }
            }}>
            <Text style={styles.textStyle}>Sign Up</Text>
          </Button>
          <Button
            style={styles.buttonStyle}
            full
            rounded
            success
            onPress={(email, password) => {
              this.setState({isLoading: true});
              try {
                email = this.state.email;
                password = this.state.password;
                auth().signInWithEmailAndPassword(email, password);
              } catch (e) {
                console.log(e.message);
              }
            }}>
            <Text style={styles.textStyle}>Log In</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
  textStyle2: {
    fontSize: 20,
    color: 'black',
    padding: 5,
  },
});

export default withNavigation(LoginScreen);
