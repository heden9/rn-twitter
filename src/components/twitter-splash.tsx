import React, { Component, ReactPropTypes, ReactElement, createContext } from "react";
import { Animated, StyleSheet, Easing } from "react-native";
import { Icon } from "native-base";
import Layout from "../constants/Layout";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SplashContext = createContext({
  finish() {},
});
export default class Splash extends Component {
  static connect(WrappedComponent: typeof React.Component) {
    return (props: any) => (
      <SplashContext.Consumer>{context => <WrappedComponent {...props} finishSplash={context.finish} />}</SplashContext.Consumer>
    );
  }

  state = {
    transformAnim: new Animated.Value(2),
    opacityAnim: new Animated.Value(1),
  };

  finish = (timeout: number = 2000): Promise<void> => {
    return new Promise((resolve) => {
      Animated.parallel([
        Animated.timing(this.state.transformAnim, {
          toValue: 50,
          duration: 1000,
          delay: timeout,
          easing: Easing.elastic(2),
        }),
        Animated.timing(this.state.opacityAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.elastic(1),
          delay: timeout + 200,
        }),
      ]).start(() => {
        this.setState({
          show: false,
        });
        resolve();
      });
    })
  }

  render() {
    return (
      <React.Fragment>
        <Animated.View
          pointerEvents="none"
          style={[styles.entrance, { opacity: this.state.opacityAnim }]}
        >
          <AnimatedIcon
            size={60}
            style={[
              styles.twitter,
              { transform: [{ scale: this.state.transformAnim }] },
            ]}
            name="logo-twitter"
          />
        </Animated.View>
        <SplashContext.Provider value={{ finish: this.finish }}>
          {this.props.children}
        </SplashContext.Provider>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  entrance: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    height: Layout.window.height,
    width: Layout.window.width,
    backgroundColor: "#1b95e0",
    alignItems: "center",
    justifyContent: "center",
  },
  twitter: {
    color: "#fff",
    position: "relative",
    top: -20,
    textAlign: "center",
  },
});
