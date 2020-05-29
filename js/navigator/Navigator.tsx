import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {
    CardStyleInterpolators,
    createStackNavigator,
    HeaderStyleInterpolators,
    StackNavigationProp
} from '@react-navigation/stack';
import {BottomTabs} from "./BottomTabs";
import {Detail} from "../pages/Detail";
import {Platform, StatusBar, StyleSheet} from "react-native";
import Category from "../components/Category";

export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    Category: undefined;
    Detail: {
        id: number;
    };
}
export type RootStackNavigation = StackNavigationProp<RootStackParamList>
const Stack = createStackNavigator<RootStackParamList>();

export class Navigator extends React.Component {
    render() {
        return (<NavigationContainer>
            <Stack.Navigator
                headerMode="float"
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    gestureEnabled: true,//Android 滑动返回
                    gestureDirection: 'horizontal',//滑动手势方向
                    ...Platform.select({
                        android:{
                            headerStatusBarHeight: StatusBar.currentHeight,
                        }
                    }),
                    headerBackTitleVisible: false,
                    //取消 滑动返回Android端阴影效果
                    headerStyle: {
                        ...Platform.select({
                            android: {
                                elevation: 0,//投影设置为0
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            },
                            ios: {}
                        })
                    }
                }}

            >
                <Stack.Screen
                    name="BottomTabs"
                    component={BottomTabs}
                    options={{headerTitle: "首页"}}/>
                <Stack.Screen
                    name="Category"
                    component={Category}
                    options={{headerTitle: "分类"}}/>
                <Stack.Screen options={{headerTitle: "详情"}}
                              name="Detail" component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>);
    }
}
