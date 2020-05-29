import React from 'react';
import {Text, StyleSheet, View, ScrollView, Alert} from "react-native";
import axios from "axios";
import {Api} from "../common/Const";
import storage, {load} from "../common/storage";
import _ from "lodash";
import CategoryItem, {itemHeight, itemWidth, margin, parentWidth} from "./CategoryItem";
import {RootStackNavigation} from "../navigator/Navigator";
import HeaderRightBtnText from "./HeaderRightBtnText";
import {goBackHeaderEvent, gradientEvent, isEditEvent} from "../utils/EventTypes";
// @ts-ignore
import EventBus from "react-native-event-bus";
import Touchable from "./Touchable";
import {DragSortableView} from 'react-native-drag-sort';

export const initialState = {
    myCategory: [
        {
            "id": "home",
            "name": "推荐"
        },
        {
            "id": "Vip",
            "name": "Vip"
        }
    ]
};

interface IProps {
    navigation: RootStackNavigation,
}

let myCategorys: any[] = [];
const flexdItems = [0, 1];
export default class Category extends React.Component<IProps> {

    state = {
        myCategory: [],
        category: [],
        isEdit: true,
    };

    constructor(props: IProps) {
        super(props);
        // @ts-ignore
        props.navigation.setOptions({
            headerRight: () => <HeaderRightBtnText onSubmit={this.onSubmit}/>
        });
    }

    onSubmit = () => {
        // Alert.alert("" + this.state.isEdit);
        const {navigation} = this.props;
        if (!this.state.isEdit) {
            // Alert.alert(JSON.stringify(myCategorys))
            storage.save({
                key: 'myCategory',
                data: myCategorys,
            });
            navigation.goBack()
            EventBus.getInstance().fireEvent(goBackHeaderEvent, {isGoBack: true});

        }
        this.setState({
            isEdit: !this.state.isEdit,
        });
        EventBus.getInstance().fireEvent(isEditEvent, {isEdit: this.state.isEdit});

    };

    componentDidMount(): void {
        // storage.remove({
        //     key: 'category'
        // });
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
        myCategorys = initialState.myCategory;
        load({
            key: 'category',
        }).then(ret => {
            // Alert.alert(JSON.stringify(ret))
            // @ts-ignore
            if (ret.length > 0) {
                this.setState({
                    category: ret,
                })
            } else {
                storage.sync.myCategory = async () => {
                    return null;
                };
                storage.sync.category = async () => {
                    const {data} = await axios.get(Api + '/mock/11/category');
                    return data.data;
                };
                // this.loadData();
            }
        }).catch(err => {
            switch (err.name) {
                case 'NotFoundError':
                    storage.sync.category = async () => {
                        const {data} = await axios.get(Api + '/mock/11/category');
                        return data.data;
                    };
                    break;
                case 'ExpiredError':
                    break;
            }
        });

    }

    onLongPress = () => {
        this.setState({
            isEdit: false,
        });
        EventBus.getInstance().fireEvent(isEditEvent, {isEdit: true});
    };
    onPress = (item: any, index: number, selected: boolean) => {
        const {myCategory, isEdit} = this.state;
        const disabled = flexdItems.indexOf(index) > -1;
        if (!isEdit) {
            if (selected) {
                if (disabled) {
                    return;
                }
                myCategorys = myCategory.filter(selectItem =>
                    // @ts-ignore
                    selectItem.id !== item.id);
                this.setState({
                    myCategory: myCategorys,
                })
            } else {
                // @ts-ignore
                myCategorys = myCategory.concat([item])
                this.setState({
                    myCategory: myCategorys,
                })
            }
        }
    };
    renderItem = (item: any, index: number) => {
        const disabled = flexdItems.indexOf(index) > -1;
        return (
            //拖拽时去掉 Touchable
            /**<Touchable key={item.id} onLongPress={this.onLongPress}
             onPress={() => this.onPress(item, index, true)}
             >*/
            <CategoryItem key={item.id} disabled={disabled} data={item} isEdit={this.state.isEdit}
                          selected={false}/>
            /**</Touchable>*/
        )
    };
    renderUnSelectItem = (item: any, index: number) => {
        return (
            <Touchable key={item.id} onLongPress={this.onLongPress}
                       onPress={() => this.onPress(item, index, false)}
            >
                <CategoryItem data={item} isEdit={this.state.isEdit} selected={true}/>
            </Touchable>
        )
    };
    onDataChange = (data: any) => {
        this.setState({
            myCategory: data,
        });
    };
    onClickItem = (data: any[], item: any) => {
        this.onPress(item, data.indexOf(item), true)
    };

    render() {
        const {myCategory, category} = this.state;
        // @ts-ignore
        const classifyGroup = _.groupBy(category, (item) => item.classify);
        return (<ScrollView style={styles.container}>
            <Text style={styles.classifyName}>{"我的分类"}</Text>
            <View style={styles.classifyView}>
                <DragSortableView dataSource={myCategory}
                                  renderItem={this.renderItem}
                                  fixedItems={flexdItems}
                                  sortable={!this.state.isEdit}
                                  keyExtractor={item => item.id}
                                  onDataChange={this.onDataChange}
                                  parentWidth={parentWidth}
                                  childrenWidth={itemWidth}
                                  childrenHeight={itemHeight}
                                  marginChildrenTop={margin}
                                  onClickItem={this.onClickItem}
                />
            </View>
            {Object.keys(classifyGroup).map(classify => {
                return (<View key={classify}>
                    <Text style={styles.classifyName}>{classify}</Text>
                    <View style={styles.classifyView}>
                        {classifyGroup[classify].map((item, index) => {
                            // @ts-ignore
                            if (myCategory.find(selectItem => selectItem.id === item.id)) {
                                return null;
                            }
                            return this.renderUnSelectItem(item, index)
                        })}
                    </View>
                </View>)
            })}
        </ScrollView>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f6f6"
    }, classifyName: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 8,
        marginLeft: 10,
    }, classifyView: {
        flexDirection: "row",
        flexWrap: "wrap",//自动换行
        padding: 5,
    },
});