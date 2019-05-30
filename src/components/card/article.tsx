import React from 'react';
import { View, Text as RNText, TouchableOpacity } from 'react-native';
import LightBox from "react-native-lightbox";
import { Image } from "react-native-expo-image-cache";

import { ArticleCardProps } from './types';
import { Icon, Avatar } from '../widget';
import { Right, ActionSheet } from 'native-base';
import styles from './style';
import Colors from '../../constants/Colors';

const noop = () => {};
const showMoreActionSheet = (who: string) => {
  const BUTTONS = [
    "添加推文到瞬间中",
    "我不喜欢这条推文",
    `取消关注${who}`,
    `隐藏${who}`,
    `屏蔽${who}`,
    "举报推文",
    "取消",
  ];
  return ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
    },
    () => {},
  );
};

export const ArticleCard: React.SFC<ArticleCardProps> = ({
  timeline,
  userInfo,
  onPress = noop,
}) => {
  return (
    <React.Fragment>
      <View style={[styles.titleWrap, { marginBottom: 20 }]}>
        <Avatar size={40} onPress={onPress} uri={userInfo.avatar} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <View style={styles.titleWrap}>
            <RNText style={styles.title} onPress={onPress}>{userInfo.nickname}</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <Right>
              <TouchableOpacity
                onPress={() => showMoreActionSheet(`@${userInfo.nickname}`)}
              >
                <Icon name="down" size={17} color={Colors.tabIconDefault} />
              </TouchableOpacity>
            </Right>
          </View>
          <View style={styles.titleWrap}>
            <RNText style={styles.subTitle}>@{userInfo.nickname}</RNText>
          </View>
        </View>
      </View>
      <RNText style={{ fontSize: 21 }}>{timeline.content ? timeline.content : timeline.brief}</RNText>
      {timeline.pics.length !== 0 && (
        <LightBox underlayColor="transparent">
          <Image style={styles.image} uri={timeline.pics[0]} />
        </LightBox>
      )}
    </React.Fragment>
  );
}
