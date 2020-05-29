// @ts-ignore
import React from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

/**
 * 自定义 TouchableOpacity 点击事件效果
 * 点击后背景 0.8
 * @param props
 * @constructor
 */
const Touchable: React.FC<TouchableOpacityProps> = React.memo(props => (
    <TouchableOpacity activeOpacity={0.8} {...props}/>));
export default Touchable;