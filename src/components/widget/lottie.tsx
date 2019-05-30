import React from 'react';
import { View } from 'native-base';
import { MyLottieProps } from './type';
import { StyleSheet, Platform } from 'react-native';

const { Lottie } = require("expo").DangerZone;

const styles = StyleSheet.create({
  lottieWrap: {
    // position: "relative",
    height: 20,
    width: 20,
    // marginTop: -7,
    // backgroundColor: 'red',
  },
  lottie: {
    position: "absolute",
    // top: "-50%",
    // left: "-50%",
    ...Platform.select({
      ios: {
        width: 65,
        height: 65,
        top: -12,
        left: -11.5,
      },
      android: {
        width: 70,
        height: 70,
        top: -25,
        left: -25,
      },
    }),
  },
})

export const MyLottie: React.SFC<MyLottieProps> = ({ source, _ref, style = {} }) => {
  return (
    <View style={[styles.lottieWrap, style]}>
      <Lottie
        loop={false}
        style={styles.lottie}
        ref={_ref}
        source={source}
        resizeMode={"cover"}
      />
    </View>
  );
}
