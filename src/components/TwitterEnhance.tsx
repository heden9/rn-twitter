import React, { Component } from "react";
import { Animated, StyleSheet, Easing } from "react-native";
import { Icon } from "native-base";
import Layout from "../constants/Layout";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export default class Entrance extends Component {
  state = {
    transformAnim: new Animated.Value(2),
    opacityAnim: new Animated.Value(1),
    show: true
  };
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.transformAnim, {
        toValue: 50,
        duration: 1200,
        delay: 2000,
        easing: Easing.elastic(2)
      }),
      Animated.timing(this.state.opacityAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay: 2200
      })
    ]).start();
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, 2500);
  }

  render() {
    if (!this.state.show) {
      return null;
    }
    return (
      <Animated.View
        pointerEvents={this.state.show ? "auto" : 'none'}
        style={[styles.entrance, { opacity: this.state.opacityAnim }]}
      >
        <AnimatedIcon
          size={60}
          style={[
            styles.twitter,
            { transform: [{ scale: this.state.transformAnim }] }
          ]}
          name="logo-twitter"
        />
      </Animated.View>
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
    justifyContent: "center"
  },
  twitter: {
    color: "#fff",
    position: "relative",
    top: -20,
    textAlign: "center"
  }
});
