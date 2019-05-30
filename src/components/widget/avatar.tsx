import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { AvatarProps } from './type';

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
  button: {
    borderRadius: 15,
    overflow: "hidden",
  },
});

export const Avatar: React.SFC<AvatarProps> = ({ onPress = () => {}, width = 30, style = {}, uri }) => {
  return (
    <TouchableOpacity style={[styles.button, { borderRadius: width / 2, width, height: width }, style]} onPress={onPress}>
      <Image
        style={[styles.image, { width, height: width }]}
        uri={uri}
      />
    </TouchableOpacity>
  );
}
