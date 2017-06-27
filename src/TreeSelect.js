const Modal = require('rc-dialog/lib/Modal')
import Icon from 'react-native-vector-icons/FontAwesome';
import Tree from './Tree'
import React, { PropTypes, Component } from 'react';
import {ScrollView, View, Text, TouchableOpacity, TextInput, TouchableHighlight} from 'react-native';
export default class TreeSelect extends Component {
    constructor() {
        super();
        this.state = {
            valueText: "",
            visible: false,
            value: [],
            info: {},
        }
    }
    onDismiss() {
        this.setState({visible: false});
        this.props.onDismiss && this.props.onDismiss();
    }
    onOk() {
        let nodes = this.state.info.selectedNodes || [];
        let str = "";
        for (let i in nodes) {
            let node = nodes[i];
            if (i < nodes.length - 1) {
                str += node.label + ",";
            } else {
                str += node.label;
            }
            
        }
        this.setState({valueText: str, visible: false})
        this.props.onChange && this.props.onChange(this.state.value, this.state.info);
    }
    onChange(value, info) {
        this.setState({value: value, info: info});
    }
    render() {
        const dismissText = this.props.dismissText || '取消';
        const okText = this.props.okText || '确定'
        let styles = this.props.styles || defautStyles;

        const {checkable, checkStrictly, multiple, treeStyle, showLine, iconSize, expandIconSize} = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: this.props.width || 200,  height: this.props.height || 40, flexDirection: 'row'}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={this.props.inputStyles || {height: 35, flex: 1, borderColor: 'black', borderBottomWidth: 1}}
                            value={this.state.valueText}
                            editable={false}
                        />
                    </View>
                    <Icon 
                        onPress={()=>this.setState({visible: !this.state.visible})}
                        name='angle-right'
                        size={this.props.inputIconSize || 28}
                    />
                </View>
                <Modal
                    animationType='slide-up'
                    wrapStyle={styles.modal}
                    visible={this.state.visible}
                    onClose={this.onDismiss.bind(this)}
                >
                    <View style={styles.header}>
                        <TouchableHighlight
                            onPress={this.onDismiss.bind(this)}
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{dismissText}</Text>
                        </TouchableHighlight>
                        <View
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                        <TouchableHighlight
                            onPress={this.onOk.bind(this)}
                            style={styles.headerItem}
                        >
                            <Text style={styles.text}>{okText}</Text>
                        </TouchableHighlight>
                    </View>
                    <Tree
                        treeData={this.props.treeData}
                        checkable={checkable}
                        checkStrictly={checkStrictly}
                        showLine={showLine}
                        iconSize={iconSize}
                        multiple={multiple}
                        treeStyle={treeStyle}
                        onSelect={this.onChange.bind(this)}
                    />
                </Modal>
            </View>
        )
    }
}
let textStyle = {
    color: '#0ae',
    fontSize: 18,
    textAlign: 'center'
};
const defautStyles = {
    input: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modal: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'
    },
    headerItem: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
    },
    actionText: textStyle
}