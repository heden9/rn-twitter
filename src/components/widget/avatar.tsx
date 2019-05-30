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

export const Avatar: React.SFC<AvatarProps> = ({ onPress = () => {}, size = 30, style = {}, uri }) => {
  return (
    <TouchableOpacity style={[styles.button, { borderRadius: size / 2, width: size, height: size }, style]} onPress={onPress}>
      <Image
        style={[styles.image, { size, height: size }]}
        uri={uri}
      />
    </TouchableOpacity>
  );
}
