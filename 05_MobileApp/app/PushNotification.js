import React from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Helper from './common/HelperFunctions';

// Naming the current page for logging
const current_page = "Push Notification";

// Getting permissions to recieve push notifications for the app
const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {

      // Checking if permissions are stored in async storage
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      // If permissions are not given, requesting permissions
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Helper.printLog(current_page,1,'Failed to get push token for push notification!')
        return;
      }

      // Getting push token from the device
      token = await Notifications.getExpoPushTokenAsync();
      Helper.printLog(current_page, 1, 'Notification Token is '+ token);
    } else {
        Helper.printLog(current_page, 1,'Must use physical device for Push Notifications');
    }

    // Creating a channel for notification in androids devices
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Messages',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  // Listener to handle notification
  const _handleNotification = notification => {
    Vibration.vibrate();
  };

  // Subscribing for push notifications
  const subscribePushNotification = () => {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    _notificationSubscription = Notifications.addListener(_handleNotification);
  }

  export default subscribePushNotification;
  