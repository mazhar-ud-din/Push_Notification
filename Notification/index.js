/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === notifee.EventType.PRESS) {
      // Handle notification press when the app is in the background
      console.log('Background Notification Pressed:', detail.notification);
    }
  });
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Listener 4 ===>', remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
