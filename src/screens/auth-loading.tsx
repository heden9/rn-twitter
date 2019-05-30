import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TwitterSplash from '../components/twitter-splash';
import { connect } from '../utils/dva';
import storage from '../utils/storage';

interface AuthLoadingProps extends NavigationScreenProps {
  autoLogin(): void;
  finishSplash(): Promise<void>;
}

@(TwitterSplash.connect as any)
class AuthLoadingScreen extends React.PureComponent<AuthLoadingProps> {
  constructor(props: AuthLoadingProps) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await storage.load({ key: 'token' }).catch(e => '');

    if (userToken) {
      console.log(userToken);
      await this.props.autoLogin();
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    await this.props.finishSplash();
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default connect(undefined, (dispatch) => {
  return {
    autoLogin() {
      dispatch({ type: 'user/autoLogin' });
    },
  }
})(AuthLoadingScreen);
