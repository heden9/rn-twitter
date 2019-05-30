import React from "react";
import {
  Header,
  Left,
  Body,
  Right,
  Container,
  Title,
  Text,
  Icon as NTcon,
} from "native-base";
import {
  View,
  Text as RNText,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Uid } from "../types";
import { Icon } from "../components/home-widget";
import Layout from "../constants/Layout";
import * as Animatable from "react-native-animatable";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
const styles = StyleSheet.create({
  round: {
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  rotate: {
    transform: [{ rotate: "90deg" }],
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent",
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
  },
  navTitleView: {
    height: Layout.HeaderHeight,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
});
const noop = () => {};
function HeaderIcon({
  name,
  onPress = noop,
  size = 32,
  style = {},
  iconStyle = {},
}: any) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.round,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
      >
        <Icon name={name} style={iconStyle} size={20} color="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );
}
interface IPersonProps {
  uid: Uid;
  navigation: any;
}
export default class Person extends React.Component<IPersonProps> {
  static navigationOptions = {
    header: null,
  };
  navTitleView: any;
  state = {
    refreshing: false,
  };
  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };
  _renderHeader = () => {
    return (
      <Header style={{ backgroundColor: "transparent", borderBottomWidth: 0 }}>
        <Left>
          <HeaderIcon
            iconStyle={{ marginBottom: -3 }}
            name="down"
            onPress={() => this.props.navigation.goBack()}
            style={styles.rotate}
          />
        </Left>
        <Right>
          <HeaderIcon
            name="pen"
            onPress={() => this.props.navigation.navigate("tweet")}
          />
        </Right>
      </Header>
    );
  };
  // render() {
  //   return (
  //     <Container>
  //       {this._renderHeader()}
  //       <ScrollView>
  //         <Text>page: Person {this.props.navigation.state.params.uid}</Text>
  //       </ScrollView>
  //     </Container>
  //   );
  // }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <HeaderImageScrollView
          maxHeight={120}
          minHeight={Layout.HeaderHeight}
          fadeOutForeground
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          overScrollMode="never"
          headerImage={require("../assets/images/bg.jpg")}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="white"
            />
          }
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <Text style={styles.navTitle}>google</Text>
            </Animatable.View>
          )}
          renderTouchableFixedForeground={this._renderHeader}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>google</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          foregroundParallaxRatio={3}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => {
              console.log("onHide");
              this.navTitleView.fadeInUp(200);
            }}
            onDisplay={() => {
              console.log("onShow");
              this.navTitleView.fadeOut(100);
            }}
          >
            <Text>google</Text>
          </TriggeringView>
          <View style={{ height: 100, backgroundColor: "#4CAF50" }} />
          <View style={{ height: 100, backgroundColor: "#F44336" }} />
          <View style={{ height: 100, backgroundColor: "#009688" }} />
          <View style={{ height: 100, backgroundColor: "#03A9F4" }} />
          <View style={{ height: 100, backgroundColor: "#FF9800" }} />
          <View style={{ height: 100, backgroundColor: "#673AB7" }} />
          <View style={{ height: 100, backgroundColor: "#795548" }} />
          <View style={{ height: 100, backgroundColor: "#FFEB3B" }} />
        </HeaderImageScrollView>
      </Container>
    );
  }
}
