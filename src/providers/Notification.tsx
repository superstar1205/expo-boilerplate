/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-alert */
import { addStoreDataAsync } from '@helpers/storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { storeEnum } from '@helpers/storage/Abstract';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// TODO: https://docs.expo.io/versions/latest/sdk/notifications/
// Register FCM and APN
 type Props = {
   children: React.ReactNode
 };

const Notification : React.FC<Props> = ({ children }) => {

  // const notificationListener = useRef();
  // const responseListener = useRef();

  // const _clearBadge = async () => {
  //   await Notifications.setBadgeCountAsync(0);
  // };

  useEffect(() => {

    if (Platform.OS !== 'web') {

      registerForPushNotificationsAsync()
        .then(async (token) => {

          await addStoreDataAsync(storeEnum.Token, token || '');
      
        });

    }
      

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications
    //   .addNotificationReceivedListener((_notification) => {
    //     console.log(_notification);
    //   });

    // This listener is fired whenever a user taps on or interacts with a notification 
    // (works when app is foregrounded, backgrounded, or killed)

    // responseListener.current = 
    // Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log(response);
    // });

    // return () => {

    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    
    // };
  
  }, []);

  return (
    <>
      {children}
    </>
  );

};

export default Notification;

async function registerForPushNotificationsAsync() {

  let token;
  
  if (Constants.isDevice) {

    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    if (existingStatus !== 'granted' || Platform.OS === 'android') {

      await Notifications.requestPermissionsAsync();
    
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  
  } 

  // eslint-disable-next-line consistent-return
  return token;

}
