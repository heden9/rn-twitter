import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const FONT = {
  fontSize: 14,
  color: Colors.subTitle,
};

export default StyleSheet.create({
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#c9c9c9',
  },
  body: {
    paddingBottom: 0,
    paddingRight: 13,
    borderBottomWidth: 0,
  },
  titleWrap: {
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
  richText: {
    fontSize: 14,
    // lineHeight: 20,
  },
});
