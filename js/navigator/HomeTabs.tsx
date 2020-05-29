import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs';
import {Home} from "../pages/Home";
import {TopTabBarWrapper} from "../components/TopTabBarWrapper";
import {StyleSheet} from "react-native";
import {goBackHeaderEvent, gradientEvent} from "../utils/EventTypes";
// @ts-ignore
import EventBus from "react-native-event-bus";
import {load} from "../common/storage";
import {initialState} from "../components/Category";

const Tab = createMaterialTopTabNavigator();

export class HomeTabs extends React.Component {
    state = {
        gradientVisible: true,
        myCategory: initialState.myCategory,
    };

    renderTabBar = (props: MaterialTopTabBarProps) => {
        return <TopTabBarWrapper {...props}/>
    };

    componentDidMount(): void {
        this.loadData();
        EventBus.getInstance().addListener(gradientEvent, (data: any) => {
            this.setState({gradientVisible: data.gradientVisible})
        });
        EventBus.getInstance().addListener(goBackHeaderEvent, (data: any) => {
            if(data.isGoBack){
                this.loadData();
            }
        });
    }
    loadData() {
        load({
            key: 'myCategory',
        }).then(ret => {
            // Alert.alert(JSON.stringify(ret))
            // @ts-ignore
            if (ret.length > 0) {
                this.setState({
                    myCategory: ret,
                })
            } else {
                this.setState({
                    myCategory: initialState.myCategory,
                })
                // this.loadData();
            }
        }).catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    this.setState({
                        myCategory: initialState.myCategory,
                    })
                    break;
                case 'ExpiredError':
                    break;
            }
        });
    }

    renderScreen = (item: any) => {
        return (<Tab.Screen
            key={item.id}
            name={item.id}
            component={Home}
            options={{
                tabBarLabel: item.name
            }}/>)
    };

    render() {
        const {myCategory} = this.state;
        return (
            <Tab.Navigator
                lazy={true}
                tabBar={this.renderTabBar}
                sceneContainerStyle={styles.sceneContainerStyle}
                tabBarOptions={{
                    scrollEnabled: true,
                    tabStyle: {
                        width: 80,
                    },
                    indicatorStyle: {
                        height: 4,
                        width: 20,
                        marginLeft: 30,
                        borderRadius: 2,
                        backgroundColor: this.state.gradientVisible ? "#f86442" : "#000",
                    },
                    activeTintColor: this.state.gradientVisible ? "#f86442" : "#000",
                    inactiveTintColor: "#333",
                }}>
                {myCategory.map(this.renderScreen)}
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    sceneContainerStyle: {
        backgroundColor: 'transparent',
    },
})