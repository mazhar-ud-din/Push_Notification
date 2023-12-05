import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


const App = () => {

  const [Message, setMessage] = useState()

  const DisplayNotification = async () => {
    if (Message?.notification?.body) {
      const channelId = await notifee.createChannel({
        id: 'notification',
        name: 'notification Channel',
      });
      await notifee.displayNotification({
        title: 'Notification Title',
        body: `${Message?.notification?.body}`,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  };
  useEffect(() => {
    DisplayNotification(Message)
  }, [Message])

  useEffect(() => {
    const requestUserPermission = async () => {
      const settings = await messaging().requestPermission();
      if (settings) {
        console.log('Permission settings:', settings);
      }
    };
    const getFCMToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
      } else {
        console.log('No FCM Token received');
      }
    };
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setMessage(remoteMessage)
    });
    const subscribe = messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('Listener 2 ===>', remoteMessage)
    });
    const handleInitialNotification = async () => {
      try {
        const remoteMessage = await messaging().getInitialNotification();
        if (remoteMessage) {
          console.log('Listener 3 ===>', remoteMessage);
        }
      } catch (error) {
        console.error('Error fetching initial notification:', error);
      }
    };
    requestUserPermission();
    getFCMToken();
    return () => {
      unsubscribe();
      subscribe();
      handleInitialNotification();
    };
  }, []);

  return (
    <View style={{ backgroundColor: `black`, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text style={{ color: `white` }}> App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})