import React from 'react';
// @ts-ignore
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Alert} from "react-native";
import {colorsStr, isEditEvent} from "../utils/EventTypes";
// @ts-ignore
import EventBus from "react-native-event-bus";

interface IProps {
    onSubmit: () => void,
}

export default class HeaderRightBtnText extends React.Component<IProps> {
    state = {
        isEdit: false,
    };

    componentDidMount(): void {
        EventBus.getInstance().addListener(isEditEvent, (data: any) => {
            this.setState({isEdit: data.isEdit})
        });
    }

    render() {
        const {onSubmit} = this.props;
        return (<HeaderButtons>
            <Item title={!this.state.isEdit ? "编辑" : "完成"} onPress={
                onSubmit
            }/>
        </HeaderButtons>);
    }

}