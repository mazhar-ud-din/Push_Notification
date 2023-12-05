import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const RequestPermission = async (setFcmToken) => {
    const settings = await messaging().requestPermission();
    if (settings) {
        GenerateFCMToken(setFcmToken)
    }
};
const GenerateFCMToken = async (setFcmToken) => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        setFcmToken(fcmToken)
    } else {
        console.log('No FCM Token received');
    }
};

const MessageNotification = (setMessage) => {
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        setMessage(remoteMessage)
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        if (remoteMessage) {
            console.log('Listener 2 ===>', remoteMessage)
        }
    });
    messaging().getInitialNotification(async (remoteMessage) => {
        if (remoteMessage) {
            console.log('Listener 3 ===>', remoteMessage)
        }
    });
}
const DisplayMessage = async (Message) => {
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



export {
    DisplayMessage, GenerateFCMToken,
    MessageNotification, RequestPermission
};

