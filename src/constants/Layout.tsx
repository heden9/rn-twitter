import { Dimensions, Platform } from 'react-native';
import isIPX from '../utils/isIpx'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  HeaderHeight: Platform.OS === "ios" ? (isIPX ? 88 : 64) : 56
};
