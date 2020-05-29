import React from 'react';
import {View, Text, Button} from "react-native";
import {RootStackNavigation} from "../navigator/Navigator";

interface IProps {
    navigation: RootStackNavigation;
}

export class Listen extends React.Component<IProps> {
    render() {
        return <View>
            <Text>11111111</Text>
            <Button title={"跳转"} onPress={() => {
                const {navigation} = this.props;
                navigation.navigate("Detail", {id: 100})
            }}/>
        </View>;
    }

}