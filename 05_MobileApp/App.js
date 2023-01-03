import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Helper from './app/common/HelperFunctions'
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './app/Navigator';
// import subscribePushNotification from './app/PushNotification';
import { Provider } from 'react-redux';
import store from './app/ReduxStore'

let global = global || window;
//Set environment for the app. Values that will work: production / uat
global.environment = 'uat';
const current_page_name = 'App';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isConnected: false
    }
  }

  async componentDidMount() {

    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ loading: false });

      NetInfo.addEventListener((state) => {
        Helper.printLog(current_page_name, 1, 'First, is ' + (state.isConnected ? 'online' : 'offline'));
        this.setState({ ...this.state, isConnected: state.isConnected });
        store.dispatch({
          type: 'CONNECTION_CHANGED',
          isConnected: this.state.isConnected
        })
      })
      // try {
      //   subscribePushNotification();
      // } catch (error) {
      //   Helper.printLog(current_page_name, 1, 'Failed to get notification token.');
      // }
    } catch (error) {
      Helper.printLog(current_page_name, 1, 'Failed to load the fonts.');
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>

    )
  }
}


