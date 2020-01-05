import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './login';
import HomeScreen from './form';
import DisplayScreen from './displaydata';
import SplashScreen from './splashscreen';

const RootStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Display: {
      screen: DisplayScreen,
    },
    Form: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;

