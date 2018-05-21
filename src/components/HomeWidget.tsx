import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import icoMoonConfig from "../assets/fonts/config.json";
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

export function TwitterIcon({ name, selected }) {
    const color = selected ? Colors.tabIconSelected : Colors.tabIconDefault;
    return (
        <Icon
            name={name}
            size={26}
            style={{ marginBottom: -3 }}
            color={color}
        />
    );
}
const margin = 20;
const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    button: {
        borderRadius: 15,
        marginLeft: margin,
        overflow: 'hidden'
    },
    pen: {
        marginRight: margin,
    }
});
const noop = () => {};
export function Avatar ({ onPress = noop }) {
    return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Image style={styles.image} source={{ uri: 'https://pbs.twimg.com/profile_images/941537711810158593/aDLJWEHU_normal.jpg' }}/>
        </TouchableHighlight>
    )
}
export function Pen ({ onPress = noop }) {
    return (
        <TouchableOpacity style={styles.pen} onPress={onPress}>
            <Icon
                name={'pen'}
                size={26}
                color={Colors.tabIconSelected}
            />
        </TouchableOpacity>
    )
}