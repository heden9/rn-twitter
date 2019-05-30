import React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { BtnLikeProps, BtnLikeState } from './type';
import { MyLottie } from './lottie';
import Colors from '../../constants/Colors';

const heart = require("../../assets/lottie/heart.json");

const styles = StyleSheet.create({
  iconText: {
    color: Colors.tabIconDefault,
    fontSize: 16,
    marginLeft: 3,
  },

  btnLike: {
    color: Colors.likeColor,
  },

  btnWrap: {
    height: 45,
    paddingVertical: 6,
    alignItems: "center",
    flexDirection: "row",
  },
})

export class BtnLike extends React.PureComponent<BtnLikeProps, BtnLikeState> {
  static getDerivedStateFromProps(
    nextProps: BtnLikeProps,
    prevState: BtnLikeState,
  ) {
    const count = +nextProps.count;
    return {
      ...prevState,
      like: nextProps.initialLike,
      count,
    };
  }

  animation: React.RefObject<any>;
  state = {
    like: false,
    count: 0,
  };

  constructor(props: BtnLikeProps) {
    super(props);
    this.animation = React.createRef();
  }

  componentDidUpdate() {
    this.setAnimationStep();
  }

  componentDidMount() {
    this.setAnimationStep();
  }

  setAnimationStep = () => {
    const { like } = this.state;
    if (like) {
      this.animation.current.play(120, 120);
    } else {
      this.animation.current.reset();
    }
  };

  onPress = () => {
    const { like, count } = this.state;
    if (like) {
      this.animation.current.reset();
    } else {
      this.animation.current.play(30, 120);
    }
    this.setState({
      like: !like,
      count: !like ? count + 1 : +this.props.count,
    });

    if (this.props.onPress) {
      this.props.onPress(!like);
    }
  };

  render() {
    const { count, like } = this.state;
    const { countShow = true, style, size = 20 } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.btnWrap, style]}>
          {MyLottie({
            _ref: this.animation,
            source: heart,
            style: {
              height: size,
              width: size,
            },
          })}
          {countShow && (
            <Text style={[styles.iconText, like ? styles.btnLike : {}]}>{count}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
