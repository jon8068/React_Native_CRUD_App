/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Container} from 'native-base';
import AppContainer from './pages/routing';

class App extends React.Component {

  render() {
    return (
      <Container>
        <AppContainer />
      </Container>
    );
  }
}

export default App;
