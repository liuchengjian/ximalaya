import React from 'react';
import {View, Text, Button} from "react-native";
import {RootStackNavigation, RootStackParamList} from "../navigator/Navigator";
import {RouteProp} from "@react-navigation/native"

interface IProps {
    navigation: RootStackNavigation;
    route: RouteProp<RootStackParamList, "Detail">;
}

export class Detail extends React.Component<IProps> {
    render() {
        const {route} = this.props;
        return <View>
            <Text>{route.params.id}</Text>
        </View>;
    }

}