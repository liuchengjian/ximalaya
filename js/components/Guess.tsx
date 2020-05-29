import React from 'react';
import {Alert, StyleSheet, View, Text, FlatList, Image} from "react-native";
import axios from "axios";
import {Api} from "../common/Const";
import Touchable from "./Touchable";
import Iconxihuan from "../../src/assets/iconfont/Iconxihuan";
import Icongengduo from "../../src/assets/iconfont/Icongengduo";
import Iconhuanyipi from "../../src/assets/iconfont/Iconhuanyipi";

/**
 * 猜你喜欢
 */
export default class Guess extends React.Component {
    state = {
        data: [],
    };

    componentDidMount(): void {
        this.loadData();
    }

    loadData() {
        axios.get(Api + '/mock/11/guess')
            .then((response) => {
                if (!response.data.success) {
                    return
                }
                let data = response.data.data;
                this.setState({
                    data: data
                })
            })
            .catch(function (e) {
                Alert.alert(JSON.stringify(e));
                // handle error
                console.log(e);
            })
            .then(function () {
                // always executed
            });
    }

    // @ts-ignore
    renderItem = ({item}) => {
        return (<Touchable style={styles.item} onPress={() => {
            Alert.alert("11111");
        }}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text numberOfLines={2}>
                {item.title}
            </Text>
        </Touchable>);
    };
    keyExtractor = (item: any) => {
        return item.id;
    };

    render() {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRight}>
                    <Iconxihuan/>
                    <Text style={styles.headerTitle}>{"猜你喜欢"}</Text>
                </View>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerMore}>{"更多"}</Text>
                    <Icongengduo/>
                </View>
            </View>
            <FlatList
                numColumns={3}
                style={styles.list}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
            <Touchable style={styles.changeGuess} onPress={() => {
                this.loadData();
            }}>
                <Iconhuanyipi color="red"/>
                <Text style={styles.changeGuessText}>{"换一批"}</Text>
            </Touchable>
        </View>);
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 8,
        margin: 16,
    }, image: {
        width: "100%",
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    item: {
        flex: 1,
        marginVertical: 6,
        marginHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        borderBottomColor: "#efefef",
        borderBottomWidth: StyleSheet.hairlineWidth,//分辨率显示相同的细线
    }, headerRight: {
        flexDirection: "row",
        alignItems: "center",
    }, headerTitle: {
        marginLeft: 5,
        color: "#333",
    }, headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    }, headerMore: {
        marginLeft: 5,
        color: "#6f6f6f",
    }, changeGuess: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    }, changeGuessText: {
        marginLeft: 5,
    }, list: {
        padding: 10,
    }

});