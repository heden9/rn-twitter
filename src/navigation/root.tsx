import React from "react";
// import { Notifications } from "expo";

import MainTabNavigator from "./main";
// import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
const AppNavigator = MainTabNavigator
// const AppNavigator = createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator
// });

const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
export default class RootNavigation extends React.PureComponent {
  // componentDidMount() {
  //   this._notificationSubscription = this._registerForPushNotifications();
  // }

  // componentWillUnmount() {
  //   this._notificationSubscription && this._notificationSubscription.remove();
  // }

  render() {
    return <AppNavigator
      // persistenceKey={navigationPersistenceKey}
    />;
  }

  // _registerForPushNotifications() {
  //   // Send our push token over to our backend so we can receive notifications
  //   // You can comment the following line out if you want to stop receiving
  //   // a notification every time you open the app. Check out the source
  //   // for this function in api/registerForPushNotificationsAsync.js
  //   registerForPushNotificationsAsync();

  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  // }

  // _handleNotification = ({ origin, data }) => {
  //   console.log(
  //     `Push notification ${origin} with data: ${JSON.stringify(data)}`
  //   );
  // };
}
