import React from 'react';
import {View, NativeSyntheticEvent, Text, FlatList, Alert, StyleSheet, NativeScrollEvent} from "react-native";
import {RootStackNavigation} from "../navigator/Navigator";
import {Carousels, imageHeight} from "../components/Carousel";
import Guess from "../components/Guess";
import axios from "axios";
import {Api} from "../common/Const";
import {ChannelItem} from "../components/ChannelItem";
import {gradientEvent} from "../utils/EventTypes";
// @ts-ignore
import EventBus from "react-native-event-bus";

interface IProps {
    navigation: RootStackNavigation;
}

let page = 0;
let limit = 10;
let total = 0;

export class Home extends React.Component<IProps> {

    state = {
        channelData: [],
        isLoading: false,
        haveMore: false,
        isRefresh: false,
    };

    loadChannelData(refresh: boolean) {
        if (refresh) {
            page = 0;
            this.setState({
                isRefresh: true,
                haveMore: true,
            });
        } else {
            // Alert.alert((page * limit < total) + "")
            if (page * limit < total) {
                this.setState({
                    isLoading: true,
                    haveMore: true,
                });
            } else {
                this.setState({
                    isLoading: true,
                    haveMore: false,
                });
                return;
            }

        }
        axios.get(Api + '/mock/11/channal')
            .then((response) => {
                if (!response.data.success) {
                    return
                }
                let data = response.data.data.results;
                total = response.data.data.pagination.total;
                if (data.length >= 0 && data.length < total) {
                    page = page + 1;
                    this.setState({
                        isLoading: true,
                        haveMore: true,
                        isRefresh: false,
                    });
                    if (refresh) {
                        this.setState({
                            channelData: data,
                        });
                    } else {
                        this.setState({
                            channelData: [...this.state.channelData, ...data],
                        });
                    }
                } else {
                    this.setState({
                        isLoading: true,
                        haveMore: false,
                        isRefresh: false,
                    })
                }

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

    componentDidMount(): void {
        this.loadChannelData(true);
    }

    onPress = (data: any) => {
        console.log(data)
    };

    // @ts-ignore
    renderItem = ({item}) => {
        return <ChannelItem data={item}
                            onPress={this.onPress}
        />
    };

    get header() {
        return (<View>
                <Carousels/>
                <View style={styles.background}>
                    <Guess/>
                </View>
            </View>
        )
    }

    keyExtractor = (item: any) => {
        return item.id;
    };
    /**
     * 加载更多
     */
    onEndReached = () => {
        this.loadChannelData(false);
    };

    get FooterView() {
        const {isLoading, haveMore, channelData} = this.state;
        if (!haveMore) {
            return <View style={styles.footerView}>
                <Text>{"--我是有底线的--"}</Text>
            </View>
        }
        // Alert.alert(isLoading + "")
        if (isLoading && haveMore && channelData.length > 0) {
            return <View style={styles.footerView}>
                <Text>{"正在加载中..."}</Text>
            </View>
        }
    }

    onRefresh = () => {
        this.loadChannelData(true);
    };
    onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        let gradientVisible = offsetY < imageHeight;
        EventBus.getInstance().fireEvent(gradientEvent, {gradientVisible: gradientVisible});
    };

    render() {
        const {isRefresh, channelData} = this.state;
        return (<FlatList
                ListHeaderComponent={this.header}
                data={channelData}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                onEndReached={this.onEndReached}
                ListFooterComponent={this.FooterView}
                refreshing={isRefresh}
                onRefresh={this.onRefresh}
                // refreshControl={}
                onEndReachedThreshold={0.2}
                onScroll={this.onScroll}
            />
        );
    }

}

const styles = StyleSheet.create({
    footerView: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
    }, background: {
        backgroundColor: "#fff"
    }
});