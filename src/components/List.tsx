import React, { ReactElement } from "react";
import {
  StyleSheet,
  View,
  Text as RNText,
  Image,
  TouchableOpacity
} from "react-native";
import {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  ActionSheet
} from "native-base";
import { Icon, ToolsBar, LikeButton } from "./HomeWidget";
import Colors from "../constants/Colors";
import { ITimelineItem, IUserInfo } from "../types";
const FONT = {
  fontSize: 16,
  color: Colors.subTitle
};
const styles = StyleSheet.create({
  titleGroup: {
    flexDirection: "row",
    marginBottom: 3
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT.fontSize,
    marginRight: 5
  },
  subTitle: {
    marginLeft: 5,
    ...FONT
  },
  dot: {
    marginHorizontal: 4,
    ...FONT
  },
  time: {
    ...FONT
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 15
  }
});
const noop = () => {};
const showMoreActionSheet = (who: string) => {
  const BUTTONS = [
    "添加推文到瞬间中",
    "我不喜欢这条推文",
    `取消关注${who}`,
    `隐藏${who}`,
    `屏蔽${who}`,
    "举报推文",
    "取消"
  ];
  return ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1
    },
    () => {}
  );
};
const forwordActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消"
];
export interface IFeedListItemProps {
  item: ITimelineItem;
  userInfo: IUserInfo;
  onPress?: () => void;
}
export function FeedListItem({
  item,
  userInfo,
  onPress = noop,
  test
}: IFeedListItemProps) {
  const toolsBarOpts = [
    {
      key: "comment",
      icon: "comment",
      label: item.comment_count
    },
    {
      key: "forward",
      icon: "forward",
      onPress: () => {
        return ActionSheet.show(
          {
            options: forwordActionOpts,
            cancelButtonIndex: forwordActionOpts.length - 1
          },
          () => {}
        );
      },
      label: item.forward_count
    },
    {
      key: "like",
      IconCpt: (
        <LikeButton
          initialLike={item.is_like}
          onPress={test}
          like_count={item.like_count}
        />
      )
    },
    {
      key: "upload",
      icon: "upload",
      onPress: () => {
        return ActionSheet.show(
          {
            options: shareActionOpts,
            cancelButtonIndex: shareActionOpts.length - 1
          },
          () => {}
        );
      }
    }
  ];
  console.log("List render");
  return (
    <ListItem onPress={onPress} key={item.key} avatar>
      <Left>
        <Thumbnail source={{ uri: userInfo.avatar }} />
      </Left>
      <Body style={{ paddingBottom: 0 }}>
        <View style={styles.titleGroup}>
          <RNText style={styles.title}>{userInfo.nick_name}</RNText>
          <Icon name="sign" size={17} color={Colors.tintColor} />
          <RNText style={styles.subTitle}>@{userInfo.nick_name}</RNText>
          <RNText style={styles.dot}>·</RNText>
          <RNText style={styles.time}>19时</RNText>
          <Right>
            <TouchableOpacity
              onPress={() => showMoreActionSheet(`@${userInfo.nick_name}`)}
            >
              <Icon name="down" size={17} color={Colors.tabIconDefault} />
            </TouchableOpacity>
          </Right>
        </View>
        <Text note style={{ lineHeight: 20 }}>
          {item.jsxText}
        </Text>
        {item.pics && (
          <Image style={styles.image} source={{ uri: item.pics[0] }} />
        )}
        <ToolsBar options={toolsBarOpts} />
      </Body>
    </ListItem>
  );
}

export function ToolsBarCreator(item: any) {
  const toolsBarOpts = [
    {
      key: "comment",
      icon: "comment",
      label: item.comment_count
    },
    {
      key: "forward",
      icon: "forward",
      onPress: () => {
        return ActionSheet.show(
          {
            options: forwordActionOpts,
            cancelButtonIndex: forwordActionOpts.length - 1
          },
          () => {}
        );
      },
      label: item.forward_count
    },
    {
      key: "like",
      IconCpt: (
        <LikeButton initialLike={item.is_like} like_count={item.like_count} />
      )
    },
    {
      key: "upload",
      icon: "upload",
      onPress: () => {
        return ActionSheet.show(
          {
            options: shareActionOpts,
            cancelButtonIndex: shareActionOpts.length - 1
          },
          () => {}
        );
      }
    }
  ];
  return function _ToolsBar() {
    return <ToolsBar options={toolsBarOpts} />;
  };
}
export function FeedListItem_3({
  item,
  userInfo,
  onPress = noop,
  children
}: IFeedListItemProps & { children?: any }) {
  return (
    <ListItem onPress={onPress} key={item.key} avatar>
      <Left>
        <Thumbnail source={{ uri: userInfo.avatar }} />
      </Left>
      <Body style={{ paddingBottom: 0 }}>
        <View style={styles.titleGroup}>
          <RNText style={styles.title}>{userInfo.nick_name}</RNText>
          <Icon name="sign" size={17} color={Colors.tintColor} />
          <RNText style={styles.subTitle}>@{userInfo.nick_name}</RNText>
          <RNText style={styles.dot}>·</RNText>
          <RNText style={styles.time}>19时</RNText>
          <Right>
            <TouchableOpacity
              onPress={() => showMoreActionSheet(`@${userInfo.nick_name}`)}
            >
              <Icon name="down" size={17} color={Colors.tabIconDefault} />
            </TouchableOpacity>
          </Right>
        </View>
        <Text note style={{ lineHeight: 20 }}>
          {item.jsxText}
        </Text>
        {item.pics && (
          <Image style={styles.image} source={{ uri: item.pics[0] }} />
        )}
        {children}
      </Body>
    </ListItem>
  );
}
export function FeedListItem_2({
  item,
  userInfo,
  onPress = noop,
  test
}: IFeedListItemProps) {
  const toolsBarOpts = [
    {
      key: "comment",
      icon: "comment"
    },
    {
      key: "forward",
      icon: "forward",
      onPress: () => {
        return ActionSheet.show(
          {
            options: forwordActionOpts,
            cancelButtonIndex: forwordActionOpts.length - 1
          },
          () => {}
        );
      }
    },
    {
      key: "like",
      IconCpt: (
        <LikeButton
          initialLike={item.is_like}
          onPress={test}
          like_count={item.like_count}
          show_count={false}
        />
      )
    },
    {
      key: "upload",
      icon: "upload",
      onPress: () => {
        return ActionSheet.show(
          {
            options: shareActionOpts,
            cancelButtonIndex: shareActionOpts.length - 1
          },
          () => {}
        );
      }
    }
  ];
  return (
    <React.Fragment>
      <View style={[styles.titleGroup, { marginBottom: 15 }]}>
        <Thumbnail source={{ uri: userInfo.avatar }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <View style={styles.titleGroup}>
            <RNText style={styles.title}>{userInfo.nick_name}</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <Right>
              <TouchableOpacity
                onPress={() => showMoreActionSheet(`@${userInfo.nick_name}`)}
              >
                <Icon name="down" size={17} color={Colors.tabIconDefault} />
              </TouchableOpacity>
            </Right>
          </View>
          <View style={styles.titleGroup}>
            <RNText style={styles.time}>@{userInfo.nick_name}</RNText>
          </View>
        </View>
      </View>
      <RNText style={{ fontSize: 20, fontWeight: "300", lineHeight: 25 }}>
        {item.jsxText}
      </RNText>
      {item.pics && (
        <Image style={styles.image} source={{ uri: item.pics[0] }} />
      )}
      <ToolsBar
        buttonStyle={{ justifyContent: "center" }}
        iconSize={22}
        options={toolsBarOpts}
      />
    </React.Fragment>
  );
}
