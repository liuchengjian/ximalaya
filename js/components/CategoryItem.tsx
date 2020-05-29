import React from 'react';
import {Text, StyleSheet, View, Alert} from "react-native";
import {viewportWidth} from "../utils/utils";

export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;
export const margin = 5;

interface IProps {
    data: any,
    isEdit: boolean,
    selected: boolean,
    disabled?: boolean,
}

export default class CategoryItem extends React.Component<IProps> {
    render() {
        const {data, isEdit, selected, disabled} = this.props;
        return (<View key={data.id} style={styles.itemView}>
            <View style={[styles.item, disabled && styles.disabled]}>
                <Text>{data.name}</Text>
                {!isEdit && !disabled &&
                (<View style={styles.icon}>
                    <Text style={styles.iconText}>{selected ? "-" : "+"}</Text>
                </View>)}
            </View>
        </View>)
    }

}
const styles = StyleSheet.create({
    itemView: {
        width: itemWidth,
        height: itemHeight,
    }, item: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        margin: margin,
        borderRadius: 4,
    }, icon: {
        position: "absolute",
        top: -5,
        right: -5,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f86442",
        borderRadius: 8,
    }, iconText: {
        color: "#fff",
    }, disabled: {
        backgroundColor: "#ccc",
    },

});