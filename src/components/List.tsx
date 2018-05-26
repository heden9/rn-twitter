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
import { Icon, ToolsBar, LikeButton, ToolsBar2 } from "./HomeWidget";
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
  likeChange?: any;
  navigate?: any;
}

export function ToolsBarHome({ item, dispatch }: { item: any; dispatch: any }) {
  console.log("toolsbar render ", item);
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
  return <ToolsBar options={toolsBarOpts} />;
}

export class FeedListItemCpt extends React.Component<
  IFeedListItemProps & { children?: any }
> {
  shouldComponentUpdate(nextProps: IFeedListItemProps) {
    return (
      this.props.item !== nextProps.item ||
      this.props.userInfo !== nextProps.userInfo
    );
  }
  componentWillUnmount() {
    console.log("list unmount", this.props.userInfo.uid);
  }
  forwardAction = () => {
    return ActionSheet.show(
      {
        options: forwordActionOpts,
        cancelButtonIndex: forwordActionOpts.length - 1
      },
      () => {}
    );
  };
  uploadAction = () => {
    return ActionSheet.show(
      {
        options: shareActionOpts,
        cancelButtonIndex: shareActionOpts.length - 1
      },
      () => {}
    );
  };
  likeChange = (like: boolean) => {
    this.props.likeChange(this.props.item.key, like);
  }

  jumpToArticle = () => {
    this.props.navigate("article", {
      uid: this.props.item.uid,
      aid: this.props.item.key,
      info: this.props.item
    });
  }
  render() {
    const { item, userInfo } = this.props;
    console.log("list render", this.props.userInfo.uid);
    return (
      <ListItem onPress={this.jumpToArticle} key={item.key} avatar>
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
          <ToolsBar2>
            <ToolsBar2.Icon
              icon={{ name: "comment", size: 20 }}
              label={item.comment_count}
            />
            <ToolsBar2.Icon
              onPress={this.forwardAction}
              icon={{ name: "forward", size: 20 }}
              label={item.forward_count}
            />
            <LikeButton
              onPress={this.likeChange}
              initialLike={item.is_like}
              like_count={item.like_count}
            />
            <ToolsBar2.Icon
              onPress={this.uploadAction}
              icon={{ name: "upload", size: 20 }}
            />
          </ToolsBar2>
        </Body>
      </ListItem>
    );
  }
}
export function FeedListItem_2({
  item,
  userInfo,
  onPress = noop
}: IFeedListItemProps) {
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
    </React.Fragment>
  );
}
