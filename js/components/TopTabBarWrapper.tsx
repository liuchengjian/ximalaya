import React from 'react';
import {Text, StyleSheet, View} from "react-native";
import {MaterialTopTabBar, MaterialTopTabBarProps} from "@react-navigation/material-top-tabs";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Touchable from "./Touchable";
import LindearGradient from "react-native-linear-gradient";
import LinearAnimatedGradientTransition from "react-native-linear-animated-gradient-transition";
// @ts-ignore
import EventBus from "react-native-event-bus";
import {colorsStr, gradientEvent} from "../utils/EventTypes";

interface IProps extends MaterialTopTabBarProps {

}

interface ConstructorParameters {
    props: any;
}

export class TopTabBarWrapper extends React.Component<IProps> {

    state = {
        colors: ["#ccc", "#e2e2e2"],
        gradientVisible: true,
    };


    componentDidMount(): void {
        EventBus.getInstance().addListener(colorsStr, (data: any) => {
            this.setState({colors: data})
        });
        EventBus.getInstance().addListener(gradientEvent, (data: any) => {
            this.setState({gradientVisible: data.gradientVisible})
        });
    }

    componentWillUnmount(): void {
    }

    get gradientView() {
        const {gradientVisible} = this.state;
        if (gradientVisible) {
            return <LinearAnimatedGradientTransition colors={this.state.colors} style={styles.gradient}/>;
        } else {
            return null;
        }
    }

    goCategory = () => {
        const {navigation} = this.props;
        navigation.navigate("Category");
    };

    render() {
        const {props} = this;
        let textColor = "#000";
        if (this.state.gradientVisible) {
            textColor = "#fff"
        }
        return (<View style={styles.container}>
            {this.gradientView}
            <View style={styles.topTabBarView}>
                <MaterialTopTabBar {...props} style={styles.tabBer}/>
                <Touchable style={[styles.categoryBtn, {borderLeftColor: textColor}]}
                           onPress={this.goCategory}
                >
                    <Text style={{color: textColor}}>{"分类"}</Text>
                </Touchable>
            </View>
            <View style={styles.bottom}>
                <Touchable style={styles.searchBtn}>
                    <Text style={{color: textColor}}>{"搜索按钮"}</Text>
                </Touchable>
                <Touchable style={styles.historyBtn}>
                    <Text style={{color: textColor}}>{"历史记录"}</Text>
                </Touchable>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: getStatusBarHeight(),
    }, tabBer: {
        flex: 1,
        elevation: 0,
        overflow: "hidden",
        backgroundColor: 'transparent',
    }, topTabBarView: {
        flexDirection: "row",
        alignItems: "center",
    }, categoryBtn: {
        paddingHorizontal: 10,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: "#eee",
    }, searchBtn: {
        flex: 1,
        paddingLeft: 10,
        height: 30,
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: "rgba(0,0,0,0.1)"
    }, bottom: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 7,
        alignItems: "center"
    },
    historyBtn: {
        marginLeft: 24,
    }, gradient: {
        ...StyleSheet.absoluteFillObject,
        height: 260,
    },
});