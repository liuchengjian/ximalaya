/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import {Navigator} from "./js/navigator/Navigator";

export class App extends React.Component{
    componentDidMount(): void {
        console.disableYellowBox = true;//去掉警告弹框
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Navigator/>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent/>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
