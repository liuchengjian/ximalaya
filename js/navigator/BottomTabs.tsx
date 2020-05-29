import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Listen} from "../pages/Listen";
import {Found} from "../pages/Found";
import {Account} from "../pages/Account";
import {RootStackNavigation, RootStackParamList} from "./Navigator";
import {RouteProp, TabNavigationState} from "@react-navigation/native"
import Iconshouye from "../../src/assets/iconfont/Iconshouye";
import Iconwoting from "../../src/assets/iconfont/Iconwoting";
import Iconfind from "../../src/assets/iconfont/Iconfind";
import IconmyS from "../../src/assets/iconfont/IconmyS";
import {HomeTabs} from "./HomeTabs";

export type BottomTabParamList = {
    HomeTabs: undefined;
    Listen: undefined,
    Found: undefined,
    Account: undefined;
}
type Route = RouteProp<RootStackParamList, "BottomTabs"> & {
    state?: TabNavigationState;
};

interface IProps {
    navigation: RootStackNavigation;
    route: Route;
}

function getHeaderTitle(routeName: String) {
    switch (routeName) {
        case "HomeTabs":
            return "首页";
        case "Listen":
            return "我听";
        case "Found":
            return "发现";
        case "Account":
            return "我的";
        default:
            return "首页";
    }
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

export class BottomTabs extends React.Component<IProps> {
    componentDidMount(): void {
        this.setOptions();
    }

    componentDidUpdate(): void {
        this.setOptions();
    }

    setOptions = () => {
        const {navigation, route} = this.props;
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || "HomeTabs";
        if (routeName === "HomeTabs") {
            navigation.setOptions({
                headerTransparent: true,
                headerTitle: "",
            });
        } else {
            navigation.setOptions({
                headerTransparent: false,
                headerTitle: getHeaderTitle(routeName),
            });
        }
    };

    render() {
        return (
            <Tab.Navigator tabBarOptions={{
                activeTintColor: '#f86442'
            }}>
                <Tab.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    options={{
                        tabBarLabel: "首页",
                        tabBarIcon: ({color, size}) => <Iconshouye size={size} color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Listen" component={Listen} options={{
                    tabBarLabel: "我听",
                    tabBarIcon: ({color, size}) => <Iconwoting size={size} color={color}/>,
                }}/>
                <Tab.Screen
                    name="Found" component={Found} options={{
                    tabBarLabel: "发现",
                    tabBarIcon: ({color, size}) => <Iconfind size={size} color={color}/>,
                }}/>
                <Tab.Screen
                    name="Account" component={Account} options={{
                    tabBarLabel: "我的",
                    tabBarIcon: ({color, size}) => <IconmyS size={size} color={color}/>,
                }}/>
            </Tab.Navigator>
        )
    }

}