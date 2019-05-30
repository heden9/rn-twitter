import React from "react";
import { StyleProvider, Root } from "native-base";
import useImmer from "dva-immer";
import useLoading from 'dva-loading';
import { AppLoading, Asset, Font } from "expo";
import TwitterSplash from './components/twitter-splash';
import RootNavigation from "./navigation/root";
import appModel from "./models/app";
import feedModel from "./models/feed";
import tweetModel from "./models/tweet";
import userModel from "./models/user";
import dva from "./utils/dva";

const getTheme = require('./theme/components').default;
const theme = require('./theme/variables/commonColor').default;

const app = dva({
  ...useImmer(),
  ...useLoading(),
  initialState: {},
  models: [appModel, feedModel, tweetModel, userModel],
});

interface IAppProps {
  skipLoadingScreen?: boolean;
}

class App extends React.Component<IAppProps> {
  state = {
    isLoadingComplete: false,
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
            <TwitterSplash>
              <RootNavigation />
            </TwitterSplash>
          </StyleProvider>
        </Root>
      );
    }
  }

  async _loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        // We include SpaceMono because we use it in Home.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        icomoon: require("./assets/fonts/icomoon.ttf"),
      }),
    ]);
  };

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default app.start(<App />);
