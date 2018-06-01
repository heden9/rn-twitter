import React from "react";
import { StyleProvider, Root } from "native-base";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import RootNavigation from "./navigation/RootNavigation";
import Enhance from "./components/TwitterEnhance";
import getTheme from "./theme/components";
import theme from "./theme/variables/commonColor";
import Colors from "./constants/Colors";
import appModel from "./models/app";
import feedModel from "./models/feed";
import tweetModel from "./models/tweet";
import useImmer from "dva-immer";
import dva from "./utils/dva";
const app = dva({
  ...useImmer(),
  initialState: {},
  models: [appModel, feedModel, tweetModel]
});
class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Root>
          <StyleProvider style={getTheme(theme)}>
            <View style={styles.container}>
              <Enhance />
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <RootNavigation />
            </View>
          </StyleProvider>
        </Root>
      );
    }
  }

  _loadResourcesAsync = () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Ionicons.font,
        // We include SpaceMono because we use it in Home.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        icomoon: require("./assets/fonts/icomoon.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default app.start(<App />);
