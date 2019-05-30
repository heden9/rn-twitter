import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from './icon';
import Colors from '../../constants/Colors';
import { BtnTweetProps } from './type';

export const BtnTweet: React.SFC<BtnTweetProps> = ({ onPress = () => {}, style = {} }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={"pen"} size={26} color={Colors.tabIconSelected} />
    </TouchableOpacity>
  );
}
