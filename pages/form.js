/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import {Container, Form, Button, Label, DatePicker} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: 'male',
      height: '',
      birthday: '',
      movieTemp: '',
      movies: [],
      docSnapshot: this.props.docSnapshot,
      flag: true,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.log("onDoneeee", this.props.navigation.state.params);
    console.log("onDoneeeedocSnapshot", this.props.navigation.state.params.docSnapshot);
    if (this.props.navigation.state.params.docSnapshot._exists) {
      console.log(this.state.flag);
      if (this.state.flag) {
        this.setStates();
      }
      console.log(
        'heytayo',
        this.props.navigation.state.params.docSnapshot._data.birthday.toDate(),
      );
    }
  }

  componentDidUpdate() {
    if (this.props.navigation.state.params.docSnapshot._exists) {
      console.log('heyy');
      if (this.state.flag) {
        this.setStates();
      }
    }
  }

  setStates() {
    this.setState({
      name: this.props.navigation.state.params.docSnapshot._data.name,
      gender: this.props.navigation.state.params.docSnapshot._data.gender,
      birthday: this.props.navigation.state.params.docSnapshot._data.birthday.toDate(),
      height: this.props.navigation.state.params.docSnapshot._data.height,
      movies: this.props.navigation.state.params.docSnapshot._data.movies,
      flag: false,
    });
  }

  getName = input => {
    this.setState({name: input}, () => {
      console.log(this.state.name);
    });
  };

  getHeight = input => {
    this.setState({height: input}, () => {
      console.log(this.state.height);
    });
  };

  updateGender = gen => {
    this.setState({gender: gen}, () => {
      console.log('Gender: ' + this.state.gender);
    });
  };

  setDate = newDate => {
    this.setState({birthday: newDate});
    console.log('Birthday: ' + this.state.birthday);
  };

  getMovieTemp = input => {
    this.setState({movieTemp: input}, () => {
      console.log('Gender: ' + this.state.movieTemp);
    });
  };

  render() {
    return (
      <ScrollView>
        <Container style={styles.contStyle}>
          <Text style={styles.textStyle}> Input your Data </Text>
          <Text> You are logged in as {auth().currentUser.email} </Text>
          <Form style={styles.formStyle}>
            <Label>Name</Label>
            <View style={styles.inputStyle}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.getName}
                value={this.state.name}
              />
            </View>
            <Label>Gender</Label>
            <View style={styles.inputStyle}>
              <Picker
                selectedValue={this.state.gender}
                onValueChange={this.updateGender}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>

            <Label>Birthday</Label>
            <View style={styles.inputStyle}>
              <DatePicker
                defaultDate={new Date(2019, 0, 1)}
                minimumDate={new Date(1970, 0, 1)}
                maximumDate={new Date(2019, 11, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Select date"
                textStyle={{color: 'black'}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                disabled={false}
                onDateChange={this.setDate}
              />
            </View>
            <Text>
              Birthday: {this.state.birthday.toString().substr(4, 12)}
            </Text>

            <Label>Height (Centimeters)</Label>
            <View style={styles.inputStyle}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.getHeight}
                keyboardType={'numeric'}
                value={this.state.height}
              />
            </View>

            <Label>Favorite Movies (Can be more than 1)</Label>
            <View style={styles.viewStyle}>
              <View style={styles.inputStyle2}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={this.getMovieTemp}
                />
              </View>
              <Button
                style={styles.buttonStyle}
                full
                rounded
                primary
                onPress={movie => {
                  movie = this.state.movieTemp;
                  const temp = [...this.state.movies];
                  temp.push(movie);
                  this.setState({movies: temp}, () => {
                    console.log(this.state.movies);
                  });
                  Alert.alert(`The Movie ${movie} has been added!`);
                }}>
                <Text style={styles.textStyle2}>Add</Text>
              </Button>
              <Button
                style={styles.buttonStyle}
                full
                rounded
                danger
                onPress={movie => {
                  movie = this.state.movieTemp;
                  const temp = [...this.state.movies];
                  temp.splice(-1, 1);
                  this.setState({movies: temp}, () => {
                    console.log(this.state.movies);
                  });
                  Alert.alert('The movie has been removed!');
                }}>
                <Text style={styles.textStyle2}>Delete</Text>
              </Button>
            </View>
            <Text>Your Movies: {this.state.movies.join(', ')} </Text>
            <Button
              style={styles.buttonStyle2}
              full
              rounded
              success
              onPress={() => {
                console.log('this.state.name', this.state.name);

                const userRef = firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid);
                userRef.set({
                  name: this.state.name,
                  gender: this.state.gender,
                  height: this.state.height,
                  birthday: this.state.birthday,
                  movies: this.state.movies,
                });
                console.log(
                  'onDone',
                  this.props.navigation.state.params.onDone(),
                );
                this.props.navigation.state.params.onDone();
                this.props.navigation.navigate('Display');
                Alert.alert('Submit Success!');
              }}>
              <Text style={styles.textStyle2}>Submit</Text>
            </Button>
          </Form>
        </Container>
      </ScrollView>
    );
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
    width: 100,
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

export default withNavigation(HomeScreen);
