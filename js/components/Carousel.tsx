import React from 'react';
import SnapCarousel, {AdditionalParallaxProps, Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from "../utils/utils";
import {Alert, StyleSheet, View} from "react-native";
import axios from "axios";
import {Api} from "../common/Const";
// @ts-ignore
import EventBus from "react-native-event-bus";
import {colorsStr} from "../utils/EventTypes";
// let data = ["http://139.9.222.156:8080/mmall/upload/b7b9e1f4-71e2-4967-9b6d-72ea214110dd.jpg",
//     "http://139.9.222.156:8080/mmall/upload/f3cde182-70d9-4a3a-9c00-d27ae927be90.jpg",
//     "http://139.9.222.156:8080/mmall/upload/81ff03e9-70fb-478d-a9aa-c908dfa7e2dd.jpg",
//     "http://139.9.222.156:8080/mmall/upload/bac9942c-6ab2-4249-bc53-ef8876dce3e9.jpg"];
const sliderWidth = viewportWidth;
const imageWidth = wp(90);
export const imageHeight = hp(26);
const itemWidth = imageWidth + wp(2) * 2;

export class Carousels extends React.Component {
    state = {
        activeSlide: 0,
        data:[],
    };
    // @ts-ignore
    componentDidMount() {
        axios.get(Api+'/mock/11/carousel')
            .then((response) => {
                if (!response.data.success) {
                    return
                }
                let data = response.data.data;
                // @ts-ignore
                let colors=data[0].colors;
                EventBus.getInstance().fireEvent(colorsStr, colors);
                this.setState({
                    data:data
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

    renderItem = ({item}: { item: string }
        , parallaxProps?: AdditionalParallaxProps
    ) => {
        // @ts-ignore
        return <ParallaxImage source={{uri: item.image}}
                              style={styles.image}
                              containerStyle={styles.containerStyle}
                              parallaxFactor={0.8}
                              showSpinner
                              spinnerColor="rgba(0,0,0,0.25)"
                              {...parallaxProps}
        />
    };
    onSnapToItem = (index: number) => {
        this.setState({
            activeSlide: index,
        })
        // @ts-ignore
        let colors=this.state.data[index].colors;
        EventBus.getInstance().fireEvent(colorsStr, colors);
    };

    get pagination() {
        const {activeSlide} = this.state;
        return (<View style={styles.paginationView}>
            <Pagination
                containerStyle={styles.paginationContainer}
                dotContainerStyle={styles.dotContainerStyle}
                dotStyle={styles.dotStyle}
                dotsLength={this.state.data.length}
                inactiveDotScale={0.7}
                activeDotIndex={activeSlide}/>
        </View>)
    }

    render() {
        return (
            <View>
                <SnapCarousel
                    data={this.state.data}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={this.onSnapToItem}
                    hasParallaxImages
                    loop
                    autoplay
                />
                {this.pagination}
            </View>);
    }
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover'
    },
    containerStyle: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 8,
    },
    paginationView: {
        justifyContent: "center",
        alignItems: "center",
    },
    paginationContainer: {
        position: "absolute",//绝对定位
        top: -20,
        backgroundColor: "rgba(0,0,0,0.35)",
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dotContainerStyle: {
        marginHorizontal: 6,
    }, dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.92)"
    }

});