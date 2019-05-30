import React from "react";
import {
  StyleSheet,
  View,
  Text as RNText,
  Image as RNImage,
  TouchableOpacity,
} from "react-native";
import {
  ListItem,
  Left,
  Thumbnail as NThumbnail,
  Body,
  Text,
  Right,
  ActionSheet,
} from "native-base";
import { Icon, ToolsBar, LikeButton, ToolsBar2 } from "./home-widget";
import Colors from "../constants/Colors";
import { Timeline, UserInfo, NavigationProps } from "../types";
import LightBox from "react-native-lightbox";
import { Image } from "react-native-expo-image-cache";
import { ImageProps } from "react-native";

const FONT = {
  fontSize: 16,
  color: Colors.subTitle,
};
const styles = StyleSheet.create({
  titleGroup: {
    flexDirection: "row",
    marginBottom: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT.fontSize,
    marginRight: 5,
  },
  subTitle: {
    marginLeft: 5,
    ...FONT,
  },
  dot: {
    marginHorizontal: 4,
    ...FONT,
  },
  time: {
    ...FONT,
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
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
const forwardActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消",
];

export interface IFeedListItemProps {
  item: Timeline;
  userInfo: UserInfo;
  likeChange?: (key: string, like: boolean) => void;
  navigation: NavigationProps;
}
// const renderCarousel = () => (
//   <Carousel
//     autoplay={false}
//     style={{ width: Layout.window.width, height: Layout.window.height }}
//   >
//     {new Array(4).fill(1).map((i, k) => (
//       <Image
//         key={k}
//         style={{ flex: 1 }}
//         resizeMode="contain"
//         source={{
//           uri: "http://lorempixel.com/640/480/city"
//         }}
//       />
//     ))}
//   </Carousel>
// );
function Thumbnail(props: ImageProps & { onPress?: () => void }) {
  const { onPress = noop } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <NThumbnail {...props}/>
    </TouchableOpacity>
  )
}

export function ToolsBarHome({ item, dispatch }: { item: any; dispatch: any }) {
  const toolsBarOpts = [
    {
      key: "comment",
      icon: "comment",
      label: item.comment_count,
    },
    {
      key: "forward",
      icon: "forward",
      onPress: () => {
        return ActionSheet.show(
          {
            options: forwardActionOpts,
            cancelButtonIndex: forwardActionOpts.length - 1,
          },
          () => {},
        );
      },
      label: item.forward_count,
    },
    {
      key: "like",
      IconCpt: (
        <LikeButton initialLike={item.is_like} likeCount={item.like_count} />
      ),
    },
    {
      key: "upload",
      icon: "upload",
      onPress: () => {
        return ActionSheet.show(
          {
            options: shareActionOpts,
            cancelButtonIndex: shareActionOpts.length - 1,
          },
          () => {},
        );
      },
    },
  ];
  return <ToolsBar options={toolsBarOpts} />;
}

export class FeedListItem extends React.Component<IFeedListItemProps> {
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
        options: forwardActionOpts,
        cancelButtonIndex: forwardActionOpts.length - 1,
      },
      () => {},
    );
  };

  uploadAction = () => {
    return ActionSheet.show(
      {
        options: shareActionOpts,
        cancelButtonIndex: shareActionOpts.length - 1,
      },
      () => {},
    );
  };

  likeChange = (like: boolean) => {
    if (this.props.likeChange) {
      this.props.likeChange(this.props.item.key, like);
    }
  };

  jumpToPerson = () => {
    this.props.navigation.navigate("person", {
      userInfo: this.props.userInfo,
      uid: this.props.item.uid,
    });
  }

  jumpToArticle = () => {
    this.props.navigation.navigate("article", {
      uid: this.props.item.uid,
      aid: this.props.item.key,
      info: this.props.item,
    });
  };

  showMoreAction = () => {
    showMoreActionSheet(`@${this.props.userInfo.nick_name}`);
  }

  render() {
    const { item, userInfo } = this.props;
    const defaultIconSize = 20;
    return (
      <ListItem onPress={this.jumpToArticle} key={item.key} avatar>
        <Left>
          <Thumbnail onPress={this.jumpToPerson} source={{ uri: userInfo.avatar }} />
        </Left>
        <Body style={{ paddingBottom: 0 }}>
          <View style={styles.titleGroup}>
            <RNText style={styles.title} onPress={this.jumpToPerson}>{userInfo.nick_name}</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <RNText style={styles.subTitle}>@{userInfo.nick_name}</RNText>
            <RNText style={styles.dot}>·</RNText>
            <RNText style={styles.time}>19时</RNText>
            <Right>
              <TouchableOpacity
                onPress={this.showMoreAction}
              >
                <Icon name="down" size={17} color={Colors.tabIconDefault} />
              </TouchableOpacity>
            </Right>
          </View>
          <Text note style={{ lineHeight: 20 }}>
            {item.jsxText}
          </Text>
          {item.pics && (
            <LightBox
              underlayColor="transparent" /*renderContent={renderCarousel}*/
            >
              <Image style={styles.image} uri={item.pics[0]} />
            </LightBox>
          )}
          <ToolsBar2>
            <ToolsBar2.Icon
              iconName="comment"
              iconSize={defaultIconSize}
              label={item.comment_count}
            />
            <ToolsBar2.Icon
              onPress={this.forwardAction}
              iconName="forward"
              iconSize={defaultIconSize}
              label={item.forward_count}
            />
            <LikeButton
              onPress={this.likeChange}
              initialLike={item.is_like}
              likeCount={item.like_count}
            />
            <ToolsBar2.Icon
              onPress={this.uploadAction}
              iconName="upload"
              iconSize={defaultIconSize}
            />
          </ToolsBar2>
        </Body>
      </ListItem>
    );
  }
}

export interface IFeedListItem2Props {
  item: Timeline;
  userInfo: UserInfo;
  onPress?: () => void;
}

// tslint:disable-next-line: variable-name
export const FeedListItem_2: React.SFC<IFeedListItem2Props> = ({
  item,
  userInfo,
  onPress = noop,
}) => {
  return (
    <React.Fragment>
      <View style={[styles.titleGroup, { marginBottom: 20 }]}>
        <Thumbnail onPress={onPress} source={{ uri: userInfo.avatar }} />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <View style={styles.titleGroup}>
            <RNText style={styles.title} onPress={onPress}>{userInfo.nick_name}</RNText>
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
        <LightBox underlayColor="transparent">
          <Image style={styles.image} uri={item.pics[0]} />
        </LightBox>
      )}
    </React.Fragment>
  );
}
