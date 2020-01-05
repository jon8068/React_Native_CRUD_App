import React from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  TextInput,
  Picker,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {Container, Form, Button, Label, DatePicker} from 'native-base';
import {withNavigation} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class DisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      flag: true,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    auth().onUserChanged(user => {
      if (user !== null) {
        this.getFirestore();
      }
    });
  }

  handleBackButton() {
    return true;
  }

  async getFirestore() {
    this.setState({isLoading: true});
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get();

    this.setState({docSnapshot: documentSnapshot, isLoading: false});
  }

  getDate = input => {
    console.log(input);
    let date = input.getDate();
    let month = input.getMonth();
    let year = input.getFullYear();
    month++;
    let birthday = date + '-' + month + '-' + year;
    return birthday;
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" style={{marginTop: 20}} />;
    }

    if (this.state.docSnapshot._exists) {
      return (
        <ScrollView>
          <Container style={styles.contStyle2}>
            <Text style={styles.textStyle}> Welcome </Text>

            <Text style={styles.textStyle2}>
              {' '}
              You are logged in as {auth().currentUser.email}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Your name is {this.state.docSnapshot._data.name}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Your gender is {this.state.docSnapshot._data.gender}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Your height is {this.state.docSnapshot._data.height}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Your birthday is{' '}
              {this.getDate(this.state.docSnapshot._data.birthday.toDate())}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Your favorite movie(s) is{' '}
              {this.state.docSnapshot._data.movies.join(', ')}
            </Text>

            <View style={{flexDirection: 'row', alignContent: 'space-around'}}>
              <Button
                rounded
                success
                style={styles.buttonStyle3}
                onPress={() => {
                  this.props.navigation.navigate('Form', {
                    docSnapshot: this.state.docSnapshot,
                    onDone: () => {
                      this.getFirestore();
                    },
                  });
                }}>
                <Text style={styles.textStyle2}>Edit Data</Text>
              </Button>
              <Button
                rounded
                danger
                style={styles.buttonStyle3}
                onPress={() => {
                  auth().signOut();
                }}>
                <Text style={styles.textStyle2}>Logout</Text>
              </Button>
            </View>
          </Container>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Container style={styles.contStyle2}>
            <Text style={styles.textStyle}> Welcome </Text>

            <Text style={styles.textStyle2}>
              {' '}
              You are logged in as {auth().currentUser.email}
            </Text>
            <Text style={styles.textStyle2}>
              {' '}
              Insert your data by clicking the green button!
            </Text>
            <View style={{flexDirection: 'row', alignContent: 'space-around'}}>
              <Button
                rounded
                success
                style={styles.buttonStyle3}
                onPress={() => {
                  this.props.navigation.navigate('Form', {
                    docSnapshot: this.state.docSnapshot,
                    onDone: () => {
                      this.getFirestore();
                    },
                  });
                }}>
                <Text style={styles.textStyle2}>Edit Data</Text>
              </Button>
              <Button
                rounded
                danger
                style={styles.buttonStyle3}
                onPress={() => {
                  auth().signOut();
                }}>
                <Text style={styles.textStyle2}>Logout</Text>
              </Button>
            </View>
          </Container>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  contStyle: {
    flex: 1,
    alignItems: 'center',
  },
  contStyle2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
  },
  buttonStyle2: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    alignSelf: 'center',
  },
  buttonStyle3: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  textStyle2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  inputStyle: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: 300,
    marginTop: 5,
    marginBottom: 5,
  },
  inputStyle2: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: 200,
    marginTop: 5,
    marginBottom: 5,
  },
  formStyle: {
    marginLeft: 5,
  },
  viewStyle: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});

export default withNavigation(DisplayScreen);
