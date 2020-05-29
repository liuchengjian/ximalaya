import React from 'react';
import {Dimensions} from "react-native";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    //四舍五入
    return Math.round(value);
}

function hp(percentage: number) {
    const value = (percentage * viewportHeight) / 100;
    //四舍五入
    return Math.round(value);
}

export {viewportWidth, viewportHeight, wp, hp};
